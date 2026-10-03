package com.bank.bankmanagement.repository;

import com.bank.bankmanagement.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {

    // Deposit using MySQL procedure
    @Procedure(procedureName = "deposit_money")
    void depositMoney(Integer accountId, BigDecimal amount);

    // Withdraw using MySQL procedure
    @Procedure(procedureName = "withdraw_money")
    void withdrawMoney(Integer accountId, BigDecimal amount);

    // Get balance using MySQL function
    @Query(value = "SELECT get_account_balance(:accountId)", nativeQuery = true)
    BigDecimal getAccountBalance(@Param("accountId") Integer accountId);

    // JOIN query
    @Query(value = """
        SELECT
            a.account_id AS accountId,
            c.customer_name AS customerName,
            b.branch_name AS branchName,
            b.branch_city AS branchCity,
            a.balance AS balance
        FROM accounts a
        JOIN customers c
            ON a.customer_id = c.customer_id
        JOIN branches b
            ON a.branch_id = b.branch_id
        """, nativeQuery = true)
    List<AccountDetailsProjection> getAccountDetails();

    // Subquery - accounts above average balance
    @Query(value = """
        SELECT *
        FROM accounts
        WHERE balance > (
            SELECT AVG(balance)
            FROM accounts
        )
        """, nativeQuery = true)
    List<Account> getAccountsAboveAverage();
}
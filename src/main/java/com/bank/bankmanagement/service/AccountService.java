package com.bank.bankmanagement.service;

import com.bank.bankmanagement.entity.Account;
import com.bank.bankmanagement.entity.Branch;
import com.bank.bankmanagement.entity.Customer;
import com.bank.bankmanagement.repository.AccountDetailsProjection;
import com.bank.bankmanagement.repository.AccountRepository;
import com.bank.bankmanagement.repository.BranchRepository;
import com.bank.bankmanagement.repository.CustomerRepository;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class AccountService {

    private final AccountRepository accountRepository;
    private final CustomerRepository customerRepository;
    private final BranchRepository branchRepository;

    public AccountService(
            AccountRepository accountRepository,
            CustomerRepository customerRepository,
            BranchRepository branchRepository) {

        this.accountRepository = accountRepository;
        this.customerRepository = customerRepository;
        this.branchRepository = branchRepository;
    }

    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    public Account addAccount(
        Integer customerId,
        String customerName,
        String branchName,
        BigDecimal balance) {

    Customer customer = customerRepository
            .findById(customerId)
            .orElse(null);

    if (customer == null) {
        customer = new Customer();
        customer.setCustomerId(customerId);
    }

    // Always use the name entered in the form
    customer.setCustomerName(customerName);
    customerRepository.save(customer);

    Branch branch = branchRepository
            .findByBranchName(branchName)
            .orElse(null);

    if (branch == null) {
        branch = new Branch();
        branch.setBranchName(branchName);
        branch.setBranchCity("Chennai");
        branchRepository.save(branch);
    }

    Account account = new Account();
    account.setCustomerId(customerId);
    account.setBranchId(branch.getBranchId());
    account.setBalance(balance);

    return accountRepository.save(account);
}
    public void deleteAccount(Integer accountId) {
        accountRepository.deleteById(accountId);
    }

    public void deposit(Integer accountId, BigDecimal amount) {
        accountRepository.depositMoney(accountId, amount);
    }

    public void withdraw(Integer accountId, BigDecimal amount) {
        accountRepository.withdrawMoney(accountId, amount);
    }

    public BigDecimal getAccountBalance(Integer accountId) {
        return accountRepository.getAccountBalance(accountId);
    }

    public List<AccountDetailsProjection> getAccountDetails() {
        return accountRepository.getAccountDetails();
    }

    public List<Account> getAccountsAboveAverage() {
        return accountRepository.getAccountsAboveAverage();
    }
}
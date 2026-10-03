package com.bank.bankmanagement.service;

import com.bank.bankmanagement.entity.Account;
import com.bank.bankmanagement.repository.AccountDetailsProjection;
import com.bank.bankmanagement.repository.AccountRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class AccountService {

    private final AccountRepository accountRepository;

    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    public Account addAccount(Account account) {
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
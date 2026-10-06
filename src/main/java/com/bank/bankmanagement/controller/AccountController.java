package com.bank.bankmanagement.controller;

import com.bank.bankmanagement.entity.Account;
import com.bank.bankmanagement.repository.AccountDetailsProjection;
import com.bank.bankmanagement.service.AccountService;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/accounts")
@CrossOrigin(origins = "*")
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping
    public List<Account> getAllAccounts() {
        return accountService.getAllAccounts();
    }

    @GetMapping("/details")
    public List<AccountDetailsProjection> getAccountDetails() {
        return accountService.getAccountDetails();
    }

    @GetMapping("/above-average")
    public List<Account> getAccountsAboveAverage() {
        return accountService.getAccountsAboveAverage();
    }

    @PostMapping
public Account addAccount(
        @RequestParam Integer customerId,
        @RequestParam String customerName,
        @RequestParam String branchName,
        @RequestParam BigDecimal balance) {

    return accountService.addAccount(
            customerId,
            customerName,
            branchName,
            balance
    );
}

    @DeleteMapping("/{accountId}")
    public String deleteAccount(@PathVariable Integer accountId) {
        accountService.deleteAccount(accountId);
        return "Account deleted successfully";
    }

    @PostMapping("/{accountId}/deposit")
    public String deposit(
            @PathVariable Integer accountId,
            @RequestParam BigDecimal amount) {

        accountService.deposit(accountId, amount);
        return "Deposit successful";
    }

    @PostMapping("/{accountId}/withdraw")
    public String withdraw(
            @PathVariable Integer accountId,
            @RequestParam BigDecimal amount) {

        accountService.withdraw(accountId, amount);
        return "Withdrawal successful";
    }

    @GetMapping("/{accountId}/balance")
    public BigDecimal getBalance(@PathVariable Integer accountId) {
        return accountService.getAccountBalance(accountId);
    }
}
package com.bank.bankmanagement.repository;

import java.math.BigDecimal;

public interface AccountDetailsProjection {

    Integer getAccountId();

    String getCustomerName();

    String getBranchName();

    String getBranchCity();

    BigDecimal getBalance();
}
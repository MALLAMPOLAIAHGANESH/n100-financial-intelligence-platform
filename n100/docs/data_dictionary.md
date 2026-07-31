# Data Dictionary

## analysis.xlsx

| Dataset       | Column Name                                               | Data Type   |   Missing Values |   Missing % |   Unique Values | Sample Value             |
|:--------------|:----------------------------------------------------------|:------------|-----------------:|------------:|----------------:|:-------------------------|
| analysis.xlsx | Bluestock Fintech — Nifty 100  |  Analysis  |  20 records | str         |                0 |           0 |              21 | id                       |
| analysis.xlsx | Unnamed: 1                                                | str         |                0 |           0 |               6 | company_id               |
| analysis.xlsx | Unnamed: 2                                                | str         |                0 |           0 |              21 | compounded_sales_growth  |
| analysis.xlsx | Unnamed: 3                                                | str         |                0 |           0 |              19 | compounded_profit_growth |
| analysis.xlsx | Unnamed: 4                                                | str         |                0 |           0 |              21 | stock_price_cagr         |
| analysis.xlsx | Unnamed: 5                                                | str         |                0 |           0 |              21 | roe                      |

## cashflow.xlsx

| Dataset       | Column Name                                                   | Data Type   |   Missing Values |   Missing % |   Unique Values | Sample Value       |
|:--------------|:--------------------------------------------------------------|:------------|-----------------:|------------:|----------------:|:-------------------|
| cashflow.xlsx | Bluestock Fintech — Nifty 100  |  Cash Flow  |  1,187 records | object      |                0 |        0    |            1188 | id                 |
| cashflow.xlsx | Unnamed: 1                                                    | str         |                0 |        0    |             101 | company_id         |
| cashflow.xlsx | Unnamed: 2                                                    | str         |                0 |        0    |              52 | year               |
| cashflow.xlsx | Unnamed: 3                                                    | object      |                2 |        0.17 |            1107 | operating_activity |
| cashflow.xlsx | Unnamed: 4                                                    | object      |                2 |        0.17 |            1063 | investing_activity |
| cashflow.xlsx | Unnamed: 5                                                    | object      |                2 |        0.17 |            1078 | financing_activity |
| cashflow.xlsx | Unnamed: 6                                                    | object      |                2 |        0.17 |             924 | net_cash_flow      |

## companies.xlsx

| Dataset        | Column Name                                          | Data Type   |   Missing Values |   Missing % |   Unique Values | Sample Value    |
|:---------------|:-----------------------------------------------------|:------------|-----------------:|------------:|----------------:|:----------------|
| companies.xlsx | Mkt Fintech — Nifty 100  |  Companies  |  92 records | str         |                0 |        0    |              93 | id              |
| companies.xlsx | Unnamed: 1                                           | str         |                1 |        1.08 |              91 | company_logo    |
| companies.xlsx | Unnamed: 10                                          | object      |                1 |        1.08 |              85 | roce_percentage |
| companies.xlsx | Unnamed: 11                                          | object      |                2 |        2.15 |              86 | roe_percentage  |
| companies.xlsx | Unnamed: 2                                           | str         |                0 |        0    |              93 | company_name    |
| companies.xlsx | Unnamed: 3                                           | str         |                0 |        0    |              55 | chart_link      |
| companies.xlsx | Unnamed: 4                                           | str         |                0 |        0    |              93 | about_company   |
| companies.xlsx | Unnamed: 5                                           | str         |                1 |        1.08 |              91 | website         |
| companies.xlsx | Unnamed: 6                                           | str         |                1 |        1.08 |              92 | nse_profile     |
| companies.xlsx | Unnamed: 7                                           | str         |                1 |        1.08 |              92 | bse_profile     |
| companies.xlsx | Unnamed: 8                                           | object      |                1 |        1.08 |               5 | face_value      |
| companies.xlsx | Unnamed: 9                                           | object      |                1 |        1.08 |              85 | book_value      |

## documents.xlsx

| Dataset        | Column Name                                                   | Data Type   |   Missing Values |   Missing % |   Unique Values | Sample Value   |
|:---------------|:--------------------------------------------------------------|:------------|-----------------:|------------:|----------------:|:---------------|
| documents.xlsx | Bluestock Fintech — Nifty 100  |  Documents  |  1,585 records | object      |                0 |        0    |            1586 | id             |
| documents.xlsx | Unnamed: 1                                                    | str         |                0 |        0    |             100 | company_id     |
| documents.xlsx | Unnamed: 2                                                    | object      |                0 |        0    |              19 | Year           |
| documents.xlsx | Unnamed: 3                                                    | str         |               52 |        3.28 |            1170 | Annual_Report  |

## profitandloss.xlsx

| Dataset            | Column Name                                                       | Data Type   |   Missing Values |   Missing % |   Unique Values | Sample Value      |
|:-------------------|:------------------------------------------------------------------|:------------|-----------------:|------------:|----------------:|:------------------|
| profitandloss.xlsx | Bluestock Fintech — Nifty 100  |  Profit & Loss  |  1,276 records | object      |                0 |        0    |            1277 | id                |
| profitandloss.xlsx | Unnamed: 1                                                        | str         |                0 |        0    |             101 | company_id        |
| profitandloss.xlsx | Unnamed: 10                                                       | object      |                0 |        0    |            1205 | profit_before_tax |
| profitandloss.xlsx | Unnamed: 11                                                       | object      |               95 |        7.44 |             117 | tax_percentage    |
| profitandloss.xlsx | Unnamed: 12                                                       | object      |                0 |        0    |            1183 | net_profit        |
| profitandloss.xlsx | Unnamed: 13                                                       | object      |                5 |        0.39 |             241 | eps               |
| profitandloss.xlsx | Unnamed: 14                                                       | object      |              103 |        8.07 |             141 | dividend_payout   |
| profitandloss.xlsx | Unnamed: 2                                                        | str         |                0 |        0    |              45 | year              |
| profitandloss.xlsx | Unnamed: 3                                                        | object      |                0 |        0    |            1258 | sales             |
| profitandloss.xlsx | Unnamed: 4                                                        | object      |                0 |        0    |            1205 | expenses          |
| profitandloss.xlsx | Unnamed: 5                                                        | object      |               13 |        1.02 |            1216 | operating_profit  |
| profitandloss.xlsx | Unnamed: 6                                                        | object      |               15 |        1.17 |             347 | opm_percentage    |
| profitandloss.xlsx | Unnamed: 7                                                        | object      |                0 |        0    |             825 | other_income      |
| profitandloss.xlsx | Unnamed: 8                                                        | object      |                0 |        0    |             898 | interest          |
| profitandloss.xlsx | Unnamed: 9                                                        | object      |                0 |        0    |             954 | depreciation      |

## prosandcons.xlsx

| Dataset          | Column Name                                                  | Data Type   |   Missing Values |   Missing % |   Unique Values | Sample Value   |
|:-----------------|:-------------------------------------------------------------|:------------|-----------------:|------------:|----------------:|:---------------|
| prosandcons.xlsx | Bluestock Fintech — Nifty 100  |  Pros & Cons  |  16 records | object      |                0 |        0    |              17 | id             |
| prosandcons.xlsx | Unnamed: 1                                                   | str         |                0 |        0    |               6 | company_id     |
| prosandcons.xlsx | Unnamed: 2                                                   | str         |                5 |       29.41 |              10 | pros           |
| prosandcons.xlsx | Unnamed: 3                                                   | str         |                1 |        5.88 |              16 | cons           |


import pandas as pd


def main():
    dict_global = {"Country": ["Japan Print Comics", "South Korea Print Comics", "United States Print Comics", "France Print Comics", "Japan Digital Comics", "South Korea Digital Comics", "United States Digital Comics", "France Digital Comics","Rest of the World"],
                   "market_revenues (million Euro)": [1170, 331, 846.4, 517, 1342, 331, 80.6, 33, 1430]}
    df = pd.DataFrame(data=dict_global)
    df.to_csv('comics-explorator/data/Global_Comics_Market.csv')

if __name__ == "__main__":
    main()
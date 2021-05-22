import pandas as pd

df1 = pd.read_csv('/Users/hemingao/Desktop/CSE412/comics-explorator/data/marvel_cleaned.csv')
df2 = pd.read_csv('/Users/hemingao/Desktop/CSE412/comics-explorator/data/marvel_aligned.csv')

count_row1 = df1.shape[0]
count_row2 = df2.shape[0]
count_column = len(df1.columns)

df2.dropna(subset=['Year'], inplace=True)
print(df2.head(10))
df2.to_csv('clean_year.csv', sep = ',')
# df1.ALIGN.replace(['Neutral Characters', 'Good Characters', 'Bad Characters'],[0,0,1], inplace=True)
# df1.to_csv('marvel_aligned.csv', sep=',')



# df3 = pd.read_csv('/Users/hemingao/Desktop/CSE412/comics-explorator/marvel_aligned.csv')

# count_row3 = df3.shape[0]

# print(count_row1 - count_row2)
# print(count_row1 - count_row3)

# print(df3.head(3))




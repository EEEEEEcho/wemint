import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt


def get_data():
    num_list = []
    with open("data.txt", "r") as f:
        lines = f.readlines()
        for line in lines:
            num_list.append(int(line))
    return num_list


numbers = get_data()
print(numbers)
# numbers = [1, 2, 3, 2, 2, 2, 3, 3, 3, 4, 5, 7]
sns.set_style("darkgrid")
sns.displot(numbers, bins=[0, 10000, 100000, 500000, 1000000, 5000000])
plt.show()
# print(numbers)

# np.random.seed(444)
# np.set_printoptions(precision=3)
# # d = np.random.laplace(loc=15, scale=3, size=500)
# print(d)
# hist, bin_edges = np.histogram(numbers)
# print(hist)

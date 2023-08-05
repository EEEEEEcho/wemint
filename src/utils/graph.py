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
sns.set_style("darkgrid")
sns.displot(numbers, bins=[0, 10000, 100000, 500000, 1000000, 5000000])
plt.show()

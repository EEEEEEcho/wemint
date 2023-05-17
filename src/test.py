# file_names = """
# wx0007df37d3ae60b2-pc
# wx0009308a238b5105-pc
# wx000b96cc505e1149-pc
# wx000d416d0d443fa7-pc
# wx0010b6a5ddbdc133-pc
# wx0012c9069fddb0d3-pc
# wx0014beae8346799b-pc
# wx00155923c66a3146-pc
# wx001651eaa8fbaf91-pc
# wx00183483cb01c472-pc
# wx001ef6ba5831a796-pc
# wx00241ba164058b83-pc
# wx002c39c0187e860e-pc
# wx002c7c67b26572fc-pc
# wx002f23d2efb96430-pc
# wx0030d34ef7f34069-pc
# wx0034c626a829060b-pc
# wx003df94785131c81-pc
# wx003f37069db8db38-pc
# wx004913f7ecc9c4ce-pc
# wx004a4a047ba3f567-pc
# wx004abb7e052a527f-pc
# wx004cc23d923e9f2b-pc
# wx0050fc6b0b420840-pc
# wx0051d0486dd51aa0-pc
# wx0053ed561426da05-pc
# wx005d2637d9630486-pc
# wx005e34bef481016b-pc
# wx005e4b807b983226-pc
# wx00638d69153992a1-pc
# wx00678894e445b4d2-pc
# wx006f1bf84c41d855-pc
# wx0074fcef3837b7e5-pc
# wx0075789611e4a14d-pc
# wx0076ee0d4552fe4a-pc
# wx00783befbf6dc32b-pc
# wx0082dcb00bc7f9cd-pc
# wx008bf3324b641193-pc
# wx0092bda79f4d7489-pc
# wx0093d940d22b1c87-pc
# wx0095e1094dbbf66d-pc
# wx0095fdc31d69e6f4-pc
# wx009aeadf25f4283d-pc
# wx009e218257d602b5-pc
# wx009e343455488adc-pc
# wx009f721ab56a0fe8-pc
# wx00a796d7b4c9884c-pc
# wx00b1b2de347c7fb1-pc
# wx00b74f75f6e2c379-pc
# wx00b77e32b1501b17-pc
# wx00b94fba35c2564d-pc
# wx00bb88373f6423b4-pc
# wx00bed0240d85f73c-pc
# wx00c462d1bc4c33f4-pc
# wx00ca982c22850e07-pc
# wx00cc9fcdbff8d1e6-pc
# wx00cd02ab1ef3e0f1-pc
# wx00dbd76979ff4db5-pc
# wx00e1bf5a0cb0d176-pc
# wx00e400c360c4c01b-pc
# wx00e426b3ef4c2836-pc
# wx00e4a41b4474d0fd-pc
# wx00e589a1ffbd544c-pc
# wx00eac0a3a2db4927-pc
# wx00eb4375fb6d0c46-pc
# wx00eb6c28c7231bf5-pc
# wx00eee55cb54466c6-pc
# wx00ef13cf50cfecbd-pc
# wx00f01f0233e6f78f-pc
# wx00f1682620fdd68d-pc
# wx00fbbc1665c4a9af-pc
# wx00fc2735badd0b2c-pc
# wx00fcd1150106049f-pc
# wx00fdc948cb7df0a1-pc
# wx010490399ec8576a-pc
# wx01067f22213d5174-pc
# wx01087e6e44b35a4c-pc
# wx010ddac564392465-pc
# wx0114fe6c8038734c-pc
# wx01154c8c8c873d44-pc
# wx01164bf22509b44e-pc
# wx0122d33f9a721a6b-pc
# wx0126baeacfa8c1ce-pc
# wx0128fc9cf32423c3-pc
# wx012c6141749065da-pc
# wx012d385bb84cb27f-pc
# wx0134e3045ce2fa80-pc
# wx0139b6520213651f-pc
# wx013cdf67c74625ee-pc
# wx013e3ebc0cff9673-pc
# wx013e5200fcc18dee-pc
# wx014be844fc592e92-pc
# wx014bee74fb80246b-pc
# wx014ec5a60f84cced-pc
# wx0151ccd6c9133be8-pc
# wx01566a1f9ee353f1-pc
# wx015e4dcc5150b783-pc
# wx01612096075e17a0-pc
# wx0161f496d4d0a6e3-pc
# wx01633a623abe4a53-pc
# """
# file_list = file_names.split('\n')
# file_set = set()
#
# for f in file_list:
#     file_set.add(f + '.wxapkg')
# package_list = os.listdir(r'F:\filter_files')
# for package in package_list:
#     if package in file_set:
#         source_pkg = r'F:\filter_files' + os.sep + package
#         dest_pkg = r'F:\wxapp-analyzer\testpkg' + os.sep + package
#         shutil.copy(source_pkg,dest_pkg)


# """
# {'wx014ec5a60f84cced-pc.wxapkg', 'wx00cc9fcdbff8d1e6-pc.wxapkg', 'wx012c6141749065da-pc.wxapkg', '.wxapkg', 'wx0014beae8346799b-pc.wxapkg', 'wx0126baeacfa8c1ce-pc.wxapkg', 'wx010490399ec8576a-pc.wxapkg', 'wx0093d940d22b1c87-pc.wxapkg', 'wx0030d34ef7f34069-pc.wxapkg', 'wx00183483cb01c472-pc.wxapkg', 'wx0050fc6b0b420840-pc.wxapkg', 'wx005d2637d9630486-pc.wxapkg', 'wx013e3ebc0cff9673-pc.wxapkg', 'wx004913f7ecc9c4ce-pc.wxapkg', 'wx00bed0240d85f73c-pc.wxapkg', 'wx004a4a047ba3f567-pc.wxapkg', 'wx01612096075e17a0-pc.wxapkg', 'wx004abb7e052a527f-pc.wxapkg', 'wx010ddac564392465-pc.wxapkg', 'wx000b96cc505e1149-pc.wxapkg', 'wx0151ccd6c9133be8-pc.wxapkg', 'wx008bf3324b641193-pc.wxapkg', 'wx00eac0a3a2db4927-pc.wxapkg', 'wx00ca982c22850e07-pc.wxapkg', 'wx00e426b3ef4c2836-pc.wxapkg', 'wx0074fcef3837b7e5-pc.wxapkg', 'wx00783befbf6dc32b-pc.wxapkg', 'wx003df94785131c81-pc.wxapkg', 'wx00eb4375fb6d0c46-pc.wxapkg', 'wx0012c9069fddb0d3-pc.wxapkg', 'wx00e4a41b4474d0fd-pc.wxapkg'}
# """


# lis = [1,2,3,4]
# for i, item in enumerate(lis):
#     print("{} {}".format(i,item))
# import time
#
# start = time.time()
# time.sleep(3)
# end = time.time()
# print(end - start)

# import numpy as np
# import matplotlib.pyplot as plt
#
# # 生成一组随机数据
# data = np.random.normal(size=1000)
#
# # 计算每个值的累积分布函数
# sorted_data = np.sort(data)
# cumulative_prob = np.linspace(0, 1, len(sorted_data))
#
# # 自定义x轴刻度和标签
# x_ticks = [7011, 162, 204, 88, 101, 18, 1]
# x_ticklabels = ['Low', '', '', 'Mid', '', '', 'High']
#
# # 绘制CDF图并指定x轴和y轴的标签和刻度
# plt.plot(sorted_data, cumulative_prob)
# plt.xlabel('Data Values')
# plt.ylabel('Cumulative Probability')
# plt.title('CDF Plot')
# plt.xticks(x_ticks, x_ticklabels)
# plt.yticks([0, 10000, 20000, 50000, 100000,1000000,10000000,60000000])
# plt.show()
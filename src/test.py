import win32api
import win32con
import time
while True:
    win32api.keybd_event(69, 0, 0, 0)    #V
    time.sleep(0.2)
    win32api.keybd_event(69, 0, win32con.KEYEVENTF_KEYUP, 0)
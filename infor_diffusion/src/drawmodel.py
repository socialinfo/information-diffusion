#!/usr/bin/python
# -*- coding: utf-8 -*-
from __future__ import division
import numpy as np
import matplotlib
from scipy.integrate import odeint
import matplotlib.pyplot as plt 
from utils import func_dict,labels,colors
#range of time
t = np.arange(0, 50, 1)

def epidemic_model(modelName,init_val,args):
    modelName = modelName.upper()
    if modelName not in func_dict:
        print 'unknown model name'
        return
    character = func_dict[modelName]
    if len(init_val) != character[1]:
        print 'too more or less initial value'
        print 'takes exactly %d' %character[1]
        return
    if len(args) != character[2]:
        print 'too more or less arguments given'
        print 'takes exactly %d' %character[2]
        return
    args = tuple(args)
    try:
        res = odeint(character[0], init_val, t, args=args) 
        cnt = 0
        times = ""
        for i in t:
            times+=str(i)+','
        print times
        for i in range(res.shape[1]):
            cur_val = ""
            for j in range(res.shape[0]):
                cur_val+=str(res[j,i])+',';
            print cur_val
    except Exception,e:
        print e
        return
#     plt.figure(figsize=(8,5))
#     
#     for  i in range(character[1]):
#         plt.plot(t,res[:,i],label=labels[i],color=colors[i],linewidth=2)
#     plt.xlabel('Time')
#     plt.ylabel('Number')
#     plt.title(modelName+' model')
#     plt.legend()
#     plt.show()

if __name__ == "__main__":
    modelName = 'SIR'
#     init_val = [99.0,1.0,0]
#     init_val_SI = [100.0,1.0]
#     args_SI = (0.003,)
#     init_val_SIR = [99.0,1.0,0.0]
#     args_SIR = (0.01,0.1)
#     init_val_SIS = [99.0,1.0]
#     args_SIS = (0.01,0.1)
#     init_val_SIRS= [99.0,1.0,0.0]
#     args_SIRS = (0.02,0.01,0.1)
#     args = (0.003,0.02)
    #epidemic_model(modelName,init_val,args)
    dd = input()
    epidemic_model(dd['type'],dd['init_val'],dd['args'])
#     epidemic_model('SIR', init_val_SIR, args_SIR)
#     epidemic_model('SIS', init_val_SIS, args_SIS)
#     epidemic_model('SIRS', init_val_SIRS, args_SIRS)
#     N = 99.0
#     I = 1.0
#     R = 0.0
#     modelNames = ['SI','SIR','SIS','SIRS']
#     initVarList = [[N,I],[N,I,R],[N,I],[N,I,R]]
#     argsList = [(0.003,),(0.01,0.1),(0.01,0.1),(0.02,0.01,0.1)]
#     
#     #drawMultiModel(modelNames,initVarList,argsList)
#     matplotlib.rcParams['figure.subplot.hspace'] = 0.4
#     drawMultiModel(modelNames,initVarList,argsList)

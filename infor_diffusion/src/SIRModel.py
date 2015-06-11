# -*- coding: utf-8 -*-
from __future__ import division

from PIL import Image
from matplotlib import rcParams
import matplotlib
from matplotlib.animation import MovieWriter, MencoderWriter, ImageMagickWriter, \
    ImageMagickFileWriter, AVConvWriter, AVConvFileWriter
from matplotlib.colors import Normalize
from numpy.random import randn, random_integers

import matplotlib.animation as am
import matplotlib.pyplot as plt    
import numpy as np
import os


#rcParams['font.family'] = 'serif'
rcParams['font.size'] = 12
rcParams['figure.figsize'] = 8, 6

#beta代表传染的速度
#gamma代表康复的速度
#注意，当beta设置的太大，会造成临近节点的S为0，以至于算法传播不出去了
beta = 0.01
gamma = 0.001

def euler_step(u, f, dt):
    tmp =  u + dt * f(u)
    tmp[:,:,0][tmp[:,:,0] < 0] = 0
    tmp[:,:,0][tmp[:,:,0] > 255] = 255
    tmp[:,:,1][tmp[:,:,1] < 0] = 0
    tmp[:,:,1][tmp[:,:,1] > 255] = 255
    tmp[:,:,2][tmp[:,:,2] < 0] = 0
    tmp[:,:,2][tmp[:,:,2] > 255] = 255
    
    return tmp
def f(u):
    S = u[:,:,2]
    I = u[:,:,0]
    R = u[:,:,1]
    
    s_tmp = -beta*(S[1:-1, 1:-1]*I[1:-1, 1:-1] +
                            S[0:-2, 1:-1]*I[0:-2, 1:-1] +
                            S[2:, 1:-1]*I[2:, 1:-1] +
                            S[1:-1, 0:-2]*I[1:-1, 0:-2] +
                            S[1:-1, 2:]*I[1:-1, 2:] +
                            S[0:-2,0:-2]*I[0:-2,0:-2]+
                            S[0:-2,2:]*I[0:-2,2:]+
                            S[2:,0:-2]*I[2:,0:-2]+
                            S[2:,2:]*I[2:,2:]
                            )
    i_tmp =beta*(S[1:-1, 1:-1]*I[1:-1, 1:-1] +
                            S[0:-2, 1:-1]*I[0:-2, 1:-1] +
                            S[2:, 1:-1]*I[2:, 1:-1] +
                            S[1:-1, 0:-2]*I[1:-1, 0:-2] +
                            S[1:-1, 2:]*I[1:-1, 2:] +
                            S[0:-2,0:-2]*I[0:-2,0:-2]+
                            S[0:-2,2:]*I[0:-2,2:]+
                            S[2:,0:-2]*I[2:,0:-2]+
                            S[2:,2:]*I[2:,2:]
                            ) - gamma*I[1:-1, 1:-1]
    r_tmp = gamma*I[1:-1, 1:-1]
    shapes = S.shape
    current = np.empty((shapes[0]-2,shapes[1]-2,3))
    current[:,:,2] = s_tmp
    current[:,:,0] = i_tmp
    current[:,:,1] = r_tmp
    padding = np.zeros_like(u)
    padding[1:-1,1:-1,:] = current
    
    return padding


TOTAL = 255
#初始化S0
S_0 = random_integers(1,TOTAL,(300,300))
#初始化I0
#I_0 = random_integers(1,2,(300,300))
I_0 = np.zeros_like(S_0)

I_num = 100
for i in range(I_num):
    tmp = random_integers(1,299,(2,))
    I_0[tmp[0],tmp[1]] = 1



#初始化R0
R_0 = np.zeros_like(S_0)
for i in range(I_num):
    tmp = random_integers(1,299,(2,))
    R_0[tmp[0],tmp[1]] = 2

T = 10                        
dt = 0.1                          
N = int(T/dt) + 1               
    
u = np.empty((N,S_0.shape[0], S_0.shape[1],3))
u[0,:,:,0] = I_0
u[0,:,:,1] = R_0
u[0,:,:,2] = S_0


fig,ax = plt.subplots()
ax.set_title('SIR model')


#初始化 全局变量img
norm = Normalize(vmin=0,vmax=255,clip=True)
img = ax.imshow(u[0]/255,norm=norm)

#设置坐标轴
cbar = fig.colorbar(img)
ticks= np.linspace(0.0,1.0,11)
cbar.ax.set_ylim(0.0, 1.0)


cbar.ax.set_yticklabels(ticks)
def animate(i):
    u[i+1] = euler_step(u[i], f, dt)
    img.set_data(u[i+1]/255)
    cbar.update_normal(img)
    return img,
def set(be,gam):
    global beta
    global gamma
    beta = be
    gamma = gam
if __name__ == '__main__':
    dd = input()
    set(dd['beta'],dd['gamma'])
    anim = am.FuncAnimation(fig, animate,frames=N-1, interval=50, blit=False)
    Writer = matplotlib.animation.writers['mencoder']
    writer = Writer(fps=10, metadata=dict(artist='SIR Simulation'),extra_args=['libx264'])
    anim.save('SIRModel.mp4',writer,extra_args=['-vcodec', 'libx264'])
   
    #anim.save('basic_animation.mp4', fps=30, extra_args=['-vcodec', 'libx264'])
    cmd ="rm -f out.gif"
    os.system(cmd)
    cmd ="ffmpeg -t 10 -ss 00:00:00 -i SIRModel.mp4 out.gif"
    os.system(cmd)
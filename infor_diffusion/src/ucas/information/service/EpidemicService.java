package ucas.information.service;



import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

import ucas.information.entity.DrawModel;
import ucas.information.entity.ModelPoint;

import ucas.information.entity.SIModel;

public class EpidemicService {
	public SIModel fittingModel(int[] xs,int[] ys){
		SIModel model = new SIModel();
		JSONObject obj = genJson(xs,ys);
		Process proc;
		try {
			String path = EpidemicService.class.getClassLoader().getResource("leastsq.py").getPath();
			String cmd = "python "+ path;
			proc = Runtime.getRuntime().exec(cmd);
			try {
				BufferedWriter out = new BufferedWriter(new  
                        OutputStreamWriter(proc.getOutputStream()));  
				out.write(obj.toString()+'\n');
				out.flush();
				BufferedReader in = new BufferedReader(new  
                        InputStreamReader(proc.getInputStream()));  
                String line;  
                String answer = "";
                while ((line = in.readLine()) != null) {  
                    answer+=line+";";
                }  
                in.close();  
				proc.waitFor();
				String strs[] = answer.split(";");
				String ps[] = strs[1].split(",");
				model.setBeta(Float.parseFloat(ps[0]));
				ArrayList list = new ArrayList();
				String []datas = strs[0].split(",");
				for(int i=0;i<datas.length;i++){
					list.add(Float.parseFloat(datas[i]));
				}
				model.setYs(list);
				
				//System.out.println(answer);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}  
		return model;
	}
	public ModelPoint drawModel(DrawModel model){
		ModelPoint mp= new ModelPoint();
		JSONObject obj = genJsonModel(model);
		//System.out.println(obj.toString());
		Process proc;
		try {
			String path = EpidemicService.class.getClassLoader().getResource("drawmodel.py").getPath();
			String cmd = "python "+ path;
			proc = Runtime.getRuntime().exec(cmd);
			try {
				BufferedWriter out = new BufferedWriter(new  
                        OutputStreamWriter(proc.getOutputStream()));  
				out.write(obj.toString()+'\n');
				out.flush();
				BufferedReader in = new BufferedReader(new  
                        InputStreamReader(proc.getInputStream()));  
                String line;  
                String answer = "";
                while ((line = in.readLine()) != null) {  
                    answer+=line+";";
                }  
                in.close();  
				proc.waitFor();
				String strs[] = answer.split(";");
				ArrayList ys = new ArrayList();
				
				for(int i=0;i<strs.length;i++){
					String[] ss = strs[i].split(",");
					ArrayList y = new ArrayList();
					for(int j=0;j<ss.length;j++){
						y.add(Float.parseFloat(ss[j]));
					}
					if(i==0){
						mp.setX(y);
					}
					else{
						ys.add(y);
					}
				}
				mp.setY(ys);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}  
		return mp; 
	}
	private JSONObject genJsonModel(DrawModel model){
		//鎻愬彇鍙傛暟 鐢熸垚json鏁版嵁
				float args[] ={model.getAlpha(),model.getBeta(),model.getGamma()};
				int init[] = {model.getN0(),model.getI0(),model.getR0()};
				//鍙傛暟
				Map<String,int[]> map = new HashMap<String,int[]>();
				map.put("SI", new int[]{1});
				map.put("SIR", new int[]{1,2});
				map.put("SIS", new int[]{1,2});
				map.put("SIRS", new int[]{0,1,2});
				
				//鍒濆鍊�
				Map<String,int[]> map2 = new HashMap<String,int[]>();
				map2.put("SI", new int[]{0,1});
				map2.put("SIR", new int[]{0,1,2});
				map2.put("SIS", new int[]{0,1});
				map2.put("SIRS", new int[]{0,1,2});
				JSONObject obj = new JSONObject();
				JSONArray initArr = new JSONArray();
				JSONArray argsArr = new JSONArray();
				
				for(int i=0;i<map.get(model.getType()).length;i++){
					int cur = (map.get(model.getType()))[i];
					try {
						argsArr.put(args[cur]);
					} catch (JSONException e) {
						e.printStackTrace();
					}
				}
				for(int i=0;i<map2.get(model.getType()).length;i++){
					int cur = (map2.get(model.getType()))[i];
					initArr.put(init[cur]);
				}
				try {
					obj.put("type",model.getType());
					obj.put("init_val", initArr);
					obj.put("args", argsArr);
				} catch (JSONException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				return obj;
	}
	private JSONObject genJson(int []xs,int []ys){
		JSONObject obj = new JSONObject();
		try {
			JSONArray xarr = new JSONArray();
			for(int i=0;i<xs.length;i++){
				xarr.put(xs[i]);
			}
			obj.put("x", xarr);
			JSONArray yarr = new JSONArray();
			for(int i=0;i<ys.length;i++){
				yarr.put(ys[i]);
			}
			obj.put("real_data",yarr);
			//int max = 
			JSONArray pArr = new JSONArray();
			pArr.put(0.001);
			obj.put("p0",pArr);
			JSONArray initArr = new JSONArray();
			initArr.put(ys[ys.length-1]);
			initArr.put(ys[0]);
			obj.put("init_val",initArr);
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		//System.out.println(obj);
		return obj;
	}
}

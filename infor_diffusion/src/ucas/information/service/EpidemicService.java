package ucas.information.service;

import java.io.BufferedReader;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

import ucas.information.entity.SIModel;

public class EpidemicService {
	public SIModel fittingModel(int[] xs,int[] ys){
		SIModel model = new SIModel();
		model.setAlpha(100);
		model.setBeta(10);
		JSONObject obj = genJson(xs,ys);
		try {
			OutputStreamWriter writer = new OutputStreamWriter(new FileOutputStream("/home/yandong/桌面/data.json"));  ;
			writer.write(obj.toString());
			writer.flush();
			writer.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		Process proc;
		try {
			//String path = EpidemicService.class.getClassLoader().getResource("leastsq.py").getPath();
			String cmd = "python "+"/home/yandong/桌面/leastsq.py";
			//String filepath = EpidemicService.class.getClassLoader().getResource("data.json").getPath();
			
			proc = Runtime.getRuntime().exec(cmd);
			try {
				BufferedReader in = new BufferedReader(new  
                        InputStreamReader(proc.getInputStream()));  
                String line;  
                while ((line = in.readLine()) != null) {  
                    System.out.println(line);  
                }  
                in.close();  
				proc.waitFor();
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}  
//		PythonInterpreter interpreter = new PythonInterpreter();  
//		String path = EpidemicService.class.getClassLoader().getResource("leastsq.py").getPath();
//		interpreter.execfile(path);  
//		PyFunction func = (PyFunction)interpreter.get("add",PyFunction.class);  
//		  
//		int a = 2010, b = 2 ;  
//	    PyObject pyobj = func.__call__(new PyInteger(a), new PyInteger(b));  
//	    System.out.println("anwser = " + pyobj.toString());  
		return model;
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

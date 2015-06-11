/**
 *作者：JasonMu
 *时间：
 *版本：
 *功能：
 */

package ucas.information.service;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import ucas.information.entity.GraphAdjacencyList;

public class Maximizing_the_spread_of_cascades {
	
	/**
	 * @param args
	 */
	public List<Integer>[] slist;
	public List<Integer> s = new LinkedList<Integer>();
	public List<Integer> activiated_nodes = new LinkedList<Integer>();
	
	public void compute(int k, Map<Integer, List<Integer>> gal) {
		
		int count = k;
		int temp = 0;
		int element = 0;
		int length = 0;

		// find the first element
		for (int i = 1; i <= gal.size(); i++) {
			length = gal.get(i).size();
			if (length > temp) {
				temp = length;
				element = i;
			}
		}
		/* add elment to initial sets */
		s.add(element);
		/* add activiated nodes to list */
		for (int m = 0; m < gal.get(element).size(); m++) {
			if (!activiated_nodes.contains(gal.get(element).get(m))) {
				activiated_nodes.add(gal.get(element).get(m));
			}
		}
		k = k - 1;
		temp = 0;
		length = 0;
		// find another k-1 elements
		while (k > 0) {
			List<Integer> list = gal.get(element);
			for (int i = 1; i < list.size(); i++) {
				if (!s.contains(list.get(i))) {
					length = gal.get(list.get(i)).size();
					if (length > temp) {
						temp = length;
						element = list.get(i);
					}
				} else {
					continue;
				}
			}
			s.add(element);
			for(int n=0;n<gal.get(element).size();n++){
				if (!activiated_nodes.contains(gal.get(element).get(n))) {
				activiated_nodes.add(gal.get(element).get(n));
				}
			}
			k = k - 1;
			temp = 0;
			length = 0;
		}
		slist[1]=activiated_nodes;
		slist[0]=s;

	}

	public void maximize( ) {
		// TODO Auto-generated method stub
	//	String path = "D:\\links.txt";
		String path = Maximizing_the_spread_of_cascades.class.getClassLoader().getResource("links.txt").getPath();
		int k = 4;
		List<Integer> initial_list;
		List<Integer> activiated_list;
		GraphAdjacencyList adjacencyList = new GraphAdjacencyList(path);
		Maximizing_the_spread_of_cascades msc = new Maximizing_the_spread_of_cascades();
		msc.compute(k, adjacencyList.Adjacency_List);
		initial_list=msc.s;
		activiated_list=msc.activiated_nodes;
        
		/* output the initial set */
		System.out.print("The initial set is: ");
		int j = 0;
		while (j < initial_list.size()) {
			System.out.print(initial_list.get(j) + "  ");
			j = j + 1;
		}
		System.out.println();
		
		/* output the activiated nodes */
		System.out.print("The activiated nodes is: ");
		int p = 0;
		while (p < activiated_list.size()) {
			System.out.print(activiated_list.get(p) + "  ");
			p = p + 1;
		}
		System.out.println();
		
		
	}
	
//	/* transfrom jason to txt file */
//	public void Jason_to_txt(String filename_jason,String filename_txt){
//		JSONObject obj = new JSONObject();
//		JSONArray arr1=new JSONArray();
//		String temp;
//		temp=ReadFile(filename_jason);
//	
//	}
//	
//	//读文件，返回字符串
//	public String ReadFile(String path){
//	    
//	    BufferedReader reader = null;
//	    String laststr = "";
//	    try {
//	     //System.out.println("以行为单位读取文件内容，一次读一整行：");
//	     reader = new BufferedReader(new FileReader(path));
//	     String tempString = null;
//	     int line = 1;
//	     //一次读入一行，直到读入null为文件结束
//	     while ((tempString = reader.readLine()) != null) {
//	      //显示行号
//	      System.out.println("line "+line+": "+tempString);
//	      laststr = laststr+tempString;
//	      line++ ;
//	     }
//	     reader.close();
//	    } catch (IOException e) {
//	     e.printStackTrace();
//	    } finally {
//	     if (reader != null) {
//	      try {
//	       reader.close();
//	      } catch (IOException e1) {
//	      }
//	     }
//	    }
//	    return laststr;
//	}
//	         //把json格式的字符串写到文件
//	public void writeFile(String filePath, String sets) throws IOException {
//	    FileWriter fw = new FileWriter(filePath);
//	    PrintWriter out = new PrintWriter(fw);
//	    out.write(sets);
//	    out.println();
//	    fw.close();
//	    out.close();
//	   }
}

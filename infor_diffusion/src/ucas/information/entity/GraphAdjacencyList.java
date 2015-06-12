package ucas.information.entity;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;


public class GraphAdjacencyList {
	/* Makes use of Map collection to store the adjacency list for each vertex. */
	public Map<Integer, List<Integer>> Adjacency_List;
	public int number_of_edges, number_of_vertices;


	public GraphAdjacencyList(String path) {
		readData_and_generateGraph(path);
	}

	/* Adds nodes in the Adjacency list for the corresponding vertex */
	public void setEdge(int source, int destination) {
		if (source > Adjacency_List.size()
				|| destination > Adjacency_List.size()) {
			System.out.println("the vertex entered in not present ");
			return;
		}
		List<Integer> slist = Adjacency_List.get(source);
		if (!slist.contains(destination)) {
			slist.add(destination);
		}
		List<Integer> dlist = Adjacency_List.get(destination);
		if (!dlist.contains(source)) {
			dlist.add(source);
		}

	}

	/* Returns the List containing the vertex joining the source vertex */
	public List<Integer> getEdge(int source) {
		if (source > Adjacency_List.size()) {
			System.out.println("the vertex entered is not present");
			return null;
		}
		return Adjacency_List.get(source);
	}

	public void readData_and_generateGraph(String path) {
		String a, b;
		int source, destination;
		int count = 1;
		BufferedReader br;
		try {
			br = new BufferedReader(new FileReader(path));

			System.out.println("Read number of vertices and edges");
			number_of_vertices = Integer.parseInt(br.readLine());
			number_of_edges = Integer.parseInt(br.readLine());
			System.out.println("vertices number=" + number_of_vertices + " "
					+ "edges number=" + number_of_edges);

			Adjacency_List = new HashMap<Integer, List<Integer>>();
			for (int i = 1; i <= number_of_vertices; i++) {
				Adjacency_List.put(i, new LinkedList<Integer>());
			}

			String s = br.readLine();
			while (s != null) {
				String[] str = s.split(" ");
				source = Integer.parseInt(str[0]);
				destination = Integer.parseInt(str[1]);
				setEdge(source, destination);
				count++;
				System.out.println("source=" + source + "" + "destination="
						+ destination);

				s = br.readLine();
			}

			System.out.println("the given Adjacency List for the graph \n");
			for (int i = 1; i <= number_of_vertices; i++) {
				System.out.print(i + "->");
				List<Integer> edgeList = getEdge(i);
				if (!edgeList.isEmpty()) {
					for (int j = 1;; j++) {
						if (j != edgeList.size()) {
							System.out.print(edgeList.get(j - 1) + "->");
						} else {
							System.out.print(edgeList.get(j - 1));
							break;
						}
					}
				}
				System.out.println();
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	/*
	 * Main Function reads the number of vertices and edges in a graph. then
	 * creates a Adjacency List for the graph and prints it
	 */
	// public static void main(String... arg) {
	// String path="D:\\data.txt";
	// GraphAdjacencyList adjacencyList = new GraphAdjacencyList(path);
	//
	// }
}
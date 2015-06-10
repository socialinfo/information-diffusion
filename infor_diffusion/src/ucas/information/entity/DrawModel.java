package ucas.information.entity;

public class DrawModel {
	String type;
	int N0;
	int I0;
	int R0;
	float beta;
	float alpha;
	float gamma;
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public int getN0() {
		return N0;
	}
	public void setN0(int n0) {
		N0 = n0;
	}
	public int getI0() {
		return I0;
	}
	public void setI0(int i0) {
		I0 = i0;
	}
	public int getR0() {
		return R0;
	}
	public void setR0(int r0) {
		R0 = r0;
	}
	public float getBeta() {
		return beta;
	}
	public void setBeta(float beta) {
		this.beta = beta;
	}
	public float getAlpha() {
		return alpha;
	}
	public void setAlpha(float alpha) {
		this.alpha = alpha;
	}
	public float getGamma() {
		return gamma;
	}
	public void setGamma(float gamma) {
		this.gamma = gamma;
	}
	public String toString(){
		return "Type="+type+" N0="+N0+" I0="+I0+" R0="+R0+" alpha="+alpha+" beta="+beta+" gamma="+gamma;
	}
}

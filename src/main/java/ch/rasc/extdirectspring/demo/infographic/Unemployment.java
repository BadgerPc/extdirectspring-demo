package ch.rasc.extdirectspring.demo.infographic;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
public class Unemployment {

	private final String label;

	private final int span;

	private final Double y2007;
	private final Double y2008;
	private final Double y2009;
	private final Double y2010;
	private final Double y2011;
	private final Double y2012;

	private final String state;

	Unemployment(String label, int span) {
		this.label = label;
		this.span = span;
		this.y2007 = null;
		this.y2008 = null;
		this.y2009 = null;
		this.y2010 = null;
		this.y2011 = null;
		this.y2012 = null;
		this.state = null;
	}

	Unemployment(String label, int span, double y2007, double y2008, double y2009,
			double y2010, double y2011, double y2012, String state) {
		this.label = label;
		this.span = span;
		this.y2007 = y2007;
		this.y2008 = y2008;
		this.y2009 = y2009;
		this.y2010 = y2010;
		this.y2011 = y2011;
		this.y2012 = y2012;
		this.state = state;
	}

	public String getLabel() {
		return label;
	}

	public int getSpan() {
		return span;
	}

	public Double getY2007() {
		return y2007;
	}

	public Double getY2008() {
		return y2008;
	}

	public Double getY2009() {
		return y2009;
	}

	public Double getY2010() {
		return y2010;
	}

	public Double getY2011() {
		return y2011;
	}

	public Double getY2012() {
		return y2012;
	}

	public String getState() {
		return state;
	}

}
package com.huibo.bo;

import java.util.Map;

import com.huibo.po.AirportLogPo;

public class Message {
	private String type;
	private Object content;
	
	public Message() {};
	public Message(String type, Object aip) {		
		this.type=type;
		this.content=aip;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Object getContent() {
		return content;
	}
	public void setContent(Object content) {
		this.content = content;
	}
}

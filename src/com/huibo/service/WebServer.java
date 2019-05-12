package com.huibo.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import com.huibo.bo.AirportLogBo;
import com.huibo.bo.Message;
import com.huibo.po.AirportLogThread;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;




@ServerEndpoint("/server")
public class WebServer {
	private Session session;
	
	private static Set<WebServer> servers=new HashSet<>();
	private Map<String,AirportLogBo> myMaps=new HashMap<>();
	private ObjectMapper oMapper=new ObjectMapper();
	@OnOpen
	public void onOpen(Session session) {
		System.out.println("有客户端进来");
		this.session=session;
		servers.add(this);
		
	}
	@OnError
	public void onError(Session session,Throwable e) {
		System.out.println("有错误发生");
		e.printStackTrace();
	}
	
	@OnClose
	public void onClose(Session session) {
		System.out.println("有客户端离开");
		servers.remove(this);		
		
	}
	
	/**
	 * 给所有已连接的客户端发送信息
	 * @param s
	 */
	public static void sendMessageAll(Message s) {
		for(WebServer server:servers ){
			server.sendMessage(s);
		}
	}
	
	/**
	 * 给当前会话的客户端发送信息
	 * @param message
	 */
	public void sendMessage(Message message) {
		String json;
		try {
			json = oMapper.writeValueAsString(message);
			session.getBasicRemote().sendText(json);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}		
	}
	
	/**
	 * 发送航班信息
	 */
	public void sendAirports() {
		sendMessage(new Message("showAirs",myMaps));
	}
	
	/**
	 * 给所有的客户端发送该客户端的航班信息
	 */
	public static void sendMyAirports() {
		for(WebServer se:servers) {
			se.sendAirports();
		}		
	}
	
	/**
	 * 接受客户端发来的信息
	 * @param message
	 */
	@OnMessage
	public void onMessage(String message) {
		try {
			System.out.println(message);
			Message m=oMapper.readValue(message,Message.class);
			System.out.println(m.getType()+":"+m.getContent());
			if(m.getType().equals("findAirport")) {
				System.out.println("查询某个航班动向");
				findAirport(m);
			}else if(m.getType().equals("showAll")) {
				System.out.println("查询所有航班动向");
				findAllAirport(myMaps);
			}else if(m.getType().equals("clearAll")) {
				System.out.println("清除所有航班动向");
				myMaps.clear();
			}
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}		
	}
	
	/**
	 * 查询航班的相关操作
	 * @param m
	 */
	public void findAirport(Message m) {
		String num=m.getContent().toString();
		System.out.println("num:"+num);
		
		
		
		if(myMaps.get(num)!=null) {
			sendMessage(new Message("showError","该航班正在监控"));
			
		}else if(AirportLogThread.findAirport(num)==null) {
			sendMessage(new Message("showError","没有这个航班"));
		}else {			
			AirportLogBo ab=null;				
			ab=AirportLogThread.maps.get(num);
			//myMaps.clear();
			myMaps.put(ab.getAirportName(),ab);
		}
	}
	
	/**
	 * 查看所有航班信息
	 * @param maps
	 */
	public void findAllAirport(Map<String,AirportLogBo> maps) {
		AirportLogThread.findAllAirport(maps);
	}
	
}




















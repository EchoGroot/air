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
		System.out.println("�пͻ��˽���");
		this.session=session;
		servers.add(this);
		
	}
	@OnError
	public void onError(Session session,Throwable e) {
		System.out.println("�д�����");
		e.printStackTrace();
	}
	
	@OnClose
	public void onClose(Session session) {
		System.out.println("�пͻ����뿪");
		servers.remove(this);		
		
	}
	
	/**
	 * �����������ӵĿͻ��˷�����Ϣ
	 * @param s
	 */
	public static void sendMessageAll(Message s) {
		for(WebServer server:servers ){
			server.sendMessage(s);
		}
	}
	
	/**
	 * ����ǰ�Ự�Ŀͻ��˷�����Ϣ
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
	 * ���ͺ�����Ϣ
	 */
	public void sendAirports() {
		sendMessage(new Message("showAirs",myMaps));
	}
	
	/**
	 * �����еĿͻ��˷��͸ÿͻ��˵ĺ�����Ϣ
	 */
	public static void sendMyAirports() {
		for(WebServer se:servers) {
			se.sendAirports();
		}		
	}
	
	/**
	 * ���ܿͻ��˷�������Ϣ
	 * @param message
	 */
	@OnMessage
	public void onMessage(String message) {
		try {
			System.out.println(message);
			Message m=oMapper.readValue(message,Message.class);
			System.out.println(m.getType()+":"+m.getContent());
			if(m.getType().equals("findAirport")) {
				System.out.println("��ѯĳ�����ද��");
				findAirport(m);
			}else if(m.getType().equals("showAll")) {
				System.out.println("��ѯ���к��ද��");
				findAllAirport(myMaps);
			}else if(m.getType().equals("clearAll")) {
				System.out.println("������к��ද��");
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
	 * ��ѯ�������ز���
	 * @param m
	 */
	public void findAirport(Message m) {
		String num=m.getContent().toString();
		System.out.println("num:"+num);
		
		
		
		if(myMaps.get(num)!=null) {
			sendMessage(new Message("showError","�ú������ڼ��"));
			
		}else if(AirportLogThread.findAirport(num)==null) {
			sendMessage(new Message("showError","û���������"));
		}else {			
			AirportLogBo ab=null;				
			ab=AirportLogThread.maps.get(num);
			//myMaps.clear();
			myMaps.put(ab.getAirportName(),ab);
		}
	}
	
	/**
	 * �鿴���к�����Ϣ
	 * @param maps
	 */
	public void findAllAirport(Map<String,AirportLogBo> maps) {
		AirportLogThread.findAllAirport(maps);
	}
	
}




















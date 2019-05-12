package com.huibo.po;

import java.util.HashMap;
import java.util.Map;

import com.huibo.bo.*;

import com.huibo.bo.Message;
import com.huibo.service.AirportServer;
import com.huibo.service.WebServer;

public class AirportLogThread extends Thread{
	private boolean b=true;
	
	public static Map<String,AirportLogBo> maps=new HashMap<>();
	
	private AirportServer as;
	
	public AirportLogThread() {}
	
	public AirportLogThread(AirportServer as) {
		this.as=as;
	}
	/**
	 * ���ݺ��������ҳ��ú������ϸ��Ϣ����һ��bo����
	 * @param num
	 * @return
	 */
	public static AirportLogBo findAirport(String num) {
		return maps.get(num);
	}
	/**
	 * ��maps�����еĺ�����Ϣ������ӽ���������ms
	 * @param ms
	 */
	public static void putAllAirport(Map<String,AirportLogBo> ms) {
		for(AirportLogBo ab:maps.values()) {
			if(ms.get(ab.getAirportName())==null) {
				ms.put(ab.getAirportName(),ab);
			}
		}
	}
	
	public static void findAllAirport(Map<String,AirportLogBo> maps1) {
		
		AirportLogThread.putAllAirport(maps1);
	}
	
	/**
	 * ��д�߳�run����
	 */
	public void run() {
		
		while(b) {
			maps=as.updateAirIds(maps);
			maps=as.uadateNextLog(maps);
			WebServer.sendMyAirports();
			try {
				Thread.sleep(60);
			} catch (InterruptedException e) {				
				e.printStackTrace();
			}			
		}
	}
	public void close() {
		b=false;
	}

	public static Map<String, AirportLogBo> getMaps() {
		return maps;
	}

	public static void setMaps(Map<String, AirportLogBo> maps) {
		AirportLogThread.maps = maps;
	}

	
}

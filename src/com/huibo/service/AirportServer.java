package com.huibo.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.huibo.bo.AirportLogBo;
import com.huibo.dao.AirportDao;

@Service
public class AirportServer {
	@Autowired
	private AirportDao ad;
	/**
	 * ���º�����Ϣ������Щ���࣬�ú�������LOG_ID��
	 * @param maps
	 * @return
	 */
	public Map<String,AirportLogBo> updateAirIds(Map<String,AirportLogBo> maps){
		if(maps==null) {
			maps=new HashMap<>();
		}
		List<AirportLogBo> abs=ad.findAirportMaxIds();
		for(AirportLogBo ab:abs) {
			if(maps.get(ab.getAirportName())==null) {
				maps.put(ab.getAirportName(),ab);
			}else {
				maps.get(ab.getAirportName()).setMaxId(ab.getMaxId());
			}
		}				
		return maps;		
	}
	
	public Map<String,AirportLogBo> updateAirIds(){
		return updateAirIds(null);
	}
	
	/**
	 * ���º�����һ�̵������Ϣ
	 * @return
	 */
	public Map<String,AirportLogBo> uadateNextLog(Map <String,AirportLogBo> maps){
		for(AirportLogBo ab:maps.values()) {
			ab.nextId();
			AirportLogBo airlog=ad.findAirportLog(ab);
			ab.setPointX(airlog.getPointX());
			ab.setPointY(airlog.getPointY());
			ab.setVec(airlog.getVec());
		}
		return maps;
	}
}

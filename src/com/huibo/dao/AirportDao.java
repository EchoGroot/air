package com.huibo.dao;

import java.util.List;

import com.huibo.bo.AirportLogBo;

public interface AirportDao {
	/**
	 * �����ݿ��в������Щ���࣬�ú����LOG_ID����Ƕ���
	 * @return
	 */
	public List<AirportLogBo> findAirportMaxIds();
	/**
	 * ���ݺ������ֲ��Ҹú������ϸ��Ϣ����һ��bo����
	 * @param airportLogBo
	 * @return
	 */
	public AirportLogBo findAirportLog(AirportLogBo airportLogBo);
	
}

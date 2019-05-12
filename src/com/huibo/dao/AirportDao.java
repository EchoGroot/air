package com.huibo.dao;

import java.util.List;

import com.huibo.bo.AirportLogBo;

public interface AirportDao {
	/**
	 * 从数据库中查出有哪些航班，该航班的LOG_ID最大是多少
	 * @return
	 */
	public List<AirportLogBo> findAirportMaxIds();
	/**
	 * 根据航班名字查找该航班的详细信息，及一个bo对象
	 * @param airportLogBo
	 * @return
	 */
	public AirportLogBo findAirportLog(AirportLogBo airportLogBo);
	
}

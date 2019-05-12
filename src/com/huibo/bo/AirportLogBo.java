package com.huibo.bo;

import com.huibo.po.AirportLogPo;

public class AirportLogBo extends AirportLogPo{
	/**
	 * 数据库里的LOG_ID
	 */
	private Integer indexId=0;
	/**
	 * 该航班最大的LOG_ID
	 */
	private Integer maxId;
	/**
	 * LOG_ID递增 如果大于maxId就回到1
	 * @return
	 */
	public Integer nextId() {
		if(++indexId>maxId) {
			indexId=1;
		}
		return indexId;
	}
	
	public Integer getIndexId() {
		return indexId;
	}
	public void setIndexId(Integer indexId) {
		this.indexId = indexId;
	}
	public Integer getMaxId() {
		return maxId;
	}
	public void setMaxId(Integer maxId) {
		this.maxId = maxId;
	}

}

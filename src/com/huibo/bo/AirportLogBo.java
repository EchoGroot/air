package com.huibo.bo;

import com.huibo.po.AirportLogPo;

public class AirportLogBo extends AirportLogPo{
	/**
	 * ���ݿ����LOG_ID
	 */
	private Integer indexId=0;
	/**
	 * �ú�������LOG_ID
	 */
	private Integer maxId;
	/**
	 * LOG_ID���� �������maxId�ͻص�1
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

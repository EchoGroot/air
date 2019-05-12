define(["js/BNUtil"],function(util) {
			var arrayList = null;
			function _person(Callback, ErrorCallback) {

				var _this = this;
				// 构造函数安全模式，避免创建时候丢掉new关键字
				if (_this instanceof _person) {
					// 根据token 去后台查询资源目录
					_this.arrayList = {
						"funcitonResources" : {// 工具类
							"sdt" : "NAVAPP", // 目前是写死的 sdt是id 后台生成的专题图id
							"NAVAPP" : {
								"type" : "NAVAPP",
								"functions" : [ {
									name : "POISearch",
									id : "1",
									type : "兴趣点搜索"
								}, {
									name : "pathPlanning",
									id : "2",
									type : "路径规划"
								}, {
									name : "nearbySearch",
									id : "3",
									type : "附近搜索"
								} ]
							}
						},
						"五层专题图":{
										type : "专题图",
										name : "五层",
										id : "2f8ce698-53c6-4cce-aade-1ae819015dc2",
										baseMap : [ {
											type : "切片",
											name : "五层",
											id : "9d85129e-7dd8-4d6f-b411-72b0bf4600c0",
											url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4F5_BNAH/MapServer",
										} ],
										baseElement : [
												{
													type : "要素",
													name : "五层运行资源",
													id : "ff6ecb05-b84d-487d-9a79-0c90d149179f",
													childrens : [
															{
																type : "要素",
																name : "五层房间",
																id : "d2796daf-8739-43aa-b0b4-9477c0390418",
																childrens : [ {
																	baseElement : [
																			{
																				type : "要素",
																				name : "五层房间点",
																				id : "7ca2df22-a6c5-4854-8084-18b406fa3354",
																				url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_FS/FeatureServer/7",
																			},
																			{
																				type : "要素",
																				name : "五层房间面",
																				id : "02d5971e-136b-458b-a3ed-6d14976fceb2",
																				url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_FS/FeatureServer/8",
																			}

																	]
																} ]

															},

													]

												}, ],
												GeometryServices:{
													url:"http://121.69.96.202:6081/arcgis/rest/services/Utilities/Geometry/GeometryServer"
												},
									/*
									 * baseDynamic:[ ]
									 */
									},
									"四层专题图":{
										type : "专题图",
										name : "四层",
										id : "3f8424cb-38b3-48be-9005-3db573c72141",
										baseMap : [ {
											type : "切片",
											name : "四层",
											id : "0e924802-88ff-4064-a288-e8da2c15ec31",
											url : "https://192.168.1.201:6443/arcgis/rest/services/XJC/BNAH_DCJ/MapServer",
										} ],
										baseElement : [
												{
																type : "要素",
																name : "四层房间",
																id : "d2796daf-8739-43aa-b0b4-9477c03904f8",
																childrens : [ {
																	baseElement : [
																			{
																				type : "要素",
																				name : "四层房间点",
																				id : "7ca2df22-a6c5-4854-8084-18b406fa3bf4",
																				url : "https://192.168.1.201:6443/arcgis/rest/services/XJC/DCJ_JKSB/FeatureServer/0",
																			}

																	]
																} ]

															}],
												GeometryServices:{
													url:"http://121.69.96.202:6081/arcgis/rest/services/Utilities/Geometry/GeometryServer"
												},
									},
								"三层专题图":{
										type : "专题图",
										name : "三层",
										id : "3f8424cb-38b3-48be-9005-3d6563c72141",
										baseMap : [ {
											type : "切片",
											name : "三层",
											id : "0e924802-88ff-4064-a288-e8da2c15ec31",
											url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4F3_BNAH/MapServer",
										} ],
										baseElement : [
												{
													
													type : "要素",
													name : "三层运行资源",
													id : "de8da56a-b466-462d-8770-a96cfac72d13",
													childrens : [
																	{
																		type : "要素",
																		name : "三层房间点",
																		id : "513fcc72-4c06-4669-93a7-190b56d09606",
																		url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_FS/FeatureServer/5",
																	},
																	{
																		type : "要素",
																		name : "三层房间面",
																		id : "513fcc72-4c06-4669-93a7-10bb6d09606",
																		url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_FS/FeatureServer/24",
																	}  
																]
												}
												 ],
												GeometryServices:{
													url:"http://121.69.96.202:6081/arcgis/rest/services/Utilities/Geometry/GeometryServer"
												},
									},
									"二层专题图":
									{
										type : "专题图",
										name : "二层",
										id : "3f8424cb-38b3-48be-9005-3d3563c72141",
										baseMap : [ {
											type : "切片",
											name : "二层",
											id : "0e924802-88ff-4064-a288-e8da2c15ec31",
											url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4F2_BNAH/MapServer",
										} ],
										baseElement : [
												{
													
													type : "要素",
													name : "二层运行资源",
													id : "de8da56a-b466-462d-8770-a96cfac72d13",
													childrens : [
																{
																		type : "要素",
																		name : "二层房间点",
																		id : "513fcc72-4c06-4669-93a7-1dbb6d09606",
																		url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_FS/FeatureServer/4",
																	},
																	{
																		type : "要素",
																		name : "二层房间面",
																		id : "513fcc72-4c06-4669-93a7-tbb6d09606",
																		url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_FS/FeatureServer/31",
																	}  
																]
												} ],
												GeometryServices:{
													url:"http://121.69.96.202:6081/arcgis/rest/services/Utilities/Geometry/GeometryServer"
												},
									},
								"一层专题图":
								{
										type : "专题图",
										name : "一层",
										id : "3f8424cb-38b3-48be-9005-7db563c72141",
										baseMap : [ {
											type : "切片",
											name : "一层",
											id : "0e924802-88ff-4064-a288-e8da2c15ec31",
											url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4F1_BNAH/MapServer",
										} ],
										baseElement : [
												{
													
													type : "要素",
													name : "一层运行资源",
													id : "de8da56a-b466-462d-8770-a96cfac72d13",
													childrens : [
																{
																		type : "要素",
																		name : "一层房间点",
																		id : "513fcc72-4c06-4669-93a7-1903d09606",
																		url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_FS/FeatureServer/3",
																	},
																	{
																		type : "要素",
																		name : "一层房间面",
																		id : "513fcc72-4c06-4669-93a7-190b56d09606",
																		url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_FS/FeatureServer/37",
																	}  
																]
												}],
												GeometryServices:{
													url:"http://121.69.96.202:6081/arcgis/rest/services/Utilities/Geometry/GeometryServer"
												},
									},
									"地下一层专题图":
									{
										type : "专题图",
										name : "B1",
										id : "3f8424cb-38b3-48be-9005-34b563c72141",
										baseMap : [ {
											type : "切片",
											name : " B1",
											id : "0e924802-88ff-4064-a288-e8da2c15ec31",
											url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4B1_BNAH/MapServer",
										} ],
										baseElement : [
												{
													
													type : "要素",
													name : "地下一层运行资源",
													id : "de8da56a-b466-462d-8770-a96cfac72d13",
													childrens : [
																{
																		type : "要素",
																		name : "地下一层房间点",
																		id : "513fcc72-4c06-4669-93a7-190bb6d09606",
																		url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_FS/FeatureServer/1",
																	},
																	{
																		type : "要素",
																		name : "地下一层房间面",
																		id : "513fcc72-4c06-4669-93a7-1907b6d09606",
																		url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_FS/FeatureServer/49",
																	}  
																]
												} ],
												GeometryServices:{
													url:"http://121.69.96.202:6081/arcgis/rest/services/Utilities/Geometry/GeometryServer"
												},
									},
									"地下二层专题图":
									{
										type : "专题图",
										name : "B2",
										id : "3f8424cb-38b3-48be-9005-35b563c72141",
										baseMap : [ {
											type : "切片",
											name : "B2",
											id : "0e924802-88ff-4064-a288-e8da2c15ec31",
											url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4B2_BNAH/MapServer",
										} ],
										baseElement : [
												{
													
													type : "要素",
													name : "地下二层运行资源",
													id : "de8da56a-b466-462d-8770-a96cfac72d13",
													childrens : [
																{
																		type : "要素",
																		name : "地下二层房间点",
																		id : "513fcc72-4c06-4669-93a7-190bb619606",
																		url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_FS/FeatureServer/2",
																	},
																	{
																		type : "要素",
																		name : "地下二层房间面",
																		id : "513fcc72-4c06-4669-93a7-190bb99606",
																		url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_FS/FeatureServer/44",
																	}  
																]
												}],
												GeometryServices:{
													url:"http://121.69.96.202:6081/arcgis/rest/services/Utilities/Geometry/GeometryServer"
												},
									},

						"myMap":{
							type : "主专题图",
							"id" : "6de6874a-6c11-456f-8a51-cmx",
							name : "大场景+航站楼",
							baseMap : {
								type : "切片",
								name : "大场景蓝背景",
								id : "b15b2630-b8fa-4766-ba78-5a72e1735412",
								url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/BNAH_DCJ_zdy_blue2/MapServer",
								display:false,
							/*	xmax : 12971893.628383232,
								xmin : 12946718.473866256,
								ymax : 4799738.439663701,
								ymin : 4787051.643456776*/
							},
							baseElement : [
								
							],
							GeometryServices:{
								url:"http://121.69.96.202:6081/arcgis/rest/services/Utilities/Geometry/GeometryServer"
							},
							"childrens" : [
									{
										type : "专题图",
										name : "五层",
										id : "2f8ce698-53c6-4cce-aade-1ae819015dc2",
										baseMap : [ {
											type : "切片",
											name : "五层",
											id : "9d85129e-7dd8-4d6f-b411-72b0bf4600c0",
											url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4F5_BNAH/MapServer",
										} ],
										baseElement : [
												{
													type : "要素",
													name : "五层运行资源",
													id : "ff6ecb05-b84d-487d-9a79-0c90d149179f",
													url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_FS/FeatureServer/7",
												}, ],
												GeometryServices:{
													url:"http://121.69.96.202:6081/arcgis/rest/services/Utilities/Geometry/GeometryServer"
												},
									/*
									 * baseDynamic:[ ]
									 */
									},
									{
										type : "专题图",
										name : "四层",
										id : "3f8424cb-38b3-48be-9005-3db573c72141",
										baseMap : [ {
											type : "切片",
											name : "四层",
											id : "0e924802-88ff-4064-a288-e8da2c15ec31",
											url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4F4_BNAH/MapServer",
										} ],
										baseElement : [
												{
																type : "要素",
																name : "四层房间",
																id : "d2796daf-8739-43aa-b0b4-9477c03904f8",
																childrens : [ {
																	baseElement : [
																			{
																				type : "要素",
																				name : "四层房间点",
																				id : "7ca2df22-a6c5-4854-8084-18b406fa3bf4",
																				url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_FS/FeatureServer/6",
																			},
																			{
																				type : "要素",
																				name : "四层房间面",
																				id : "02d5971e-136b-458b-a3ed-6d14971fceb2",
																				url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_FS/FeatureServer/17",
																			}

																	]
																} ]

															}],
												GeometryServices:{
													url:"http://121.69.96.202:6081/arcgis/rest/services/Utilities/Geometry/GeometryServer"
												},
									},
									{
										type : "专题图",
										name : "三层",
										id : "3f8424cb-38b3-48be-9005-3d6563c72141",
										baseMap : [ {
											type : "切片",
											name : "三层",
											id : "0e924802-88ff-4064-a288-e8da2c15ec31",
											url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4F3_BNAH/MapServer",
										} ],
										baseElement : [
												{
													
													type : "要素",
													name : "三层运行资源",
													id : "de8da56a-b466-462d-8770-a96cfac72d13",
													childrens : [
																	{
																		type : "要素",
																		name : "三层房间点",
																		id : "513fcc72-4c06-4669-93a7-190b56d09606",
																		url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_FS/FeatureServer/5",
																	},
																	{
																		type : "要素",
																		name : "三层房间面",
																		id : "513fcc72-4c06-4669-93a7-10bb6d09606",
																		url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_FS/FeatureServer/24",
																	}  
																]
												}
												 ],
												GeometryServices:{
													url:"http://121.69.96.202:6081/arcgis/rest/services/Utilities/Geometry/GeometryServer"
												},
									},
									
									{
										type : "专题图",
										name : "二层",
										id : "3f8424cb-38b3-48be-9005-3d3563c72141",
										baseMap : [ {
											type : "切片",
											name : "二层",
											id : "0e924802-88ff-4064-a288-e8da2c15ec31",
											url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4F2_BNAH/MapServer",
										} ],
										baseElement : [
												{
													
													type : "要素",
													name : "二层运行资源",
													id : "de8da56a-b466-462d-8770-a96cfac72d13",
													childrens : [
																{
																		type : "要素",
																		name : "二层房间点",
																		id : "513fcc72-4c06-4669-93a7-1dbb6d09606",
																		url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_FS/FeatureServer/4",
																	},
																	{
																		type : "要素",
																		name : "二层房间面",
																		id : "513fcc72-4c06-4669-93a7-tbb6d09606",
																		url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_FS/FeatureServer/31",
																	}  
																]
												} ],
												GeometryServices:{
													url:"http://121.69.96.202:6081/arcgis/rest/services/Utilities/Geometry/GeometryServer"
												},
									},
									
									{
										type : "专题图",
										name : "一层",
										id : "3f8424cb-38b3-48be-9005-7db563c72141",
										baseMap : [ {
											type : "切片",
											name : "一层",
											id : "0e924802-88ff-4064-a288-e8da2c15ec31",
											url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4F1_BNAH/MapServer",
										} ],
										baseElement : [
												{
													
													type : "要素",
													name : "一层运行资源",
													id : "de8da56a-b466-462d-8770-a96cfac72d13",
													childrens : [
																{
																		type : "要素",
																		name : "一层房间点",
																		id : "513fcc72-4c06-4669-93a7-1903d09606",
																		url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_FS/FeatureServer/3",
																	},
																	{
																		type : "要素",
																		name : "一层房间面",
																		id : "513fcc72-4c06-4669-93a7-190b56d09606",
																		url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_FS/FeatureServer/37",
																	}  
																]
												}],
												GeometryServices:{
													url:"http://121.69.96.202:6081/arcgis/rest/services/Utilities/Geometry/GeometryServer"
												},
									},
									{
										type : "专题图",
										name : "B1",
										id : "3f8424cb-38b3-48be-9005-34b563c72141",
										baseMap : [ {
											type : "切片",
											name : " B1",
											id : "0e924802-88ff-4064-a288-e8da2c15ec31",
											url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4B1_BNAH/MapServer",
										} ],
										baseElement : [
												{
													
													type : "要素",
													name : "地下一层运行资源",
													id : "de8da56a-b466-462d-8770-a96cfac72d13",
													childrens : [
																{
																		type : "要素",
																		name : "地下一层房间点",
																		id : "513fcc72-4c06-4669-93a7-190bb6d09606",
																		url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_FS/FeatureServer/1",
																	},
																	{
																		type : "要素",
																		name : "地下一层房间面",
																		id : "513fcc72-4c06-4669-93a7-1907b6d09606",
																		url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_FS/FeatureServer/49",
																	}  
																]
												} ],
												GeometryServices:{
													url:"http://121.69.96.202:6081/arcgis/rest/services/Utilities/Geometry/GeometryServer"
												},
									},
									{
										type : "专题图",
										name : "B2",
										id : "3f8424cb-38b3-48be-9005-35b563c72141",
										baseMap : [ {
											type : "切片",
											name : "B2",
											id : "0e924802-88ff-4064-a288-e8da2c15ec31",
											url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4B2_BNAH/MapServer",
										} ],
										baseElement : [
												{
													
													type : "要素",
													name : "地下二层运行资源",
													id : "de8da56a-b466-462d-8770-a96cfac72d13",
													childrens : [
																{
																		type : "要素",
																		name : "地下二层房间点",
																		id : "513fcc72-4c06-4669-93a7-190bb619606",
																		url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_FS/FeatureServer/2",
																	},
																	{
																		type : "要素",
																		name : "地下二层房间面",
																		id : "513fcc72-4c06-4669-93a7-190bb99606",
																		url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_FS/FeatureServer/44",
																	}  
																]
												}],
												GeometryServices:{
													url:"http://121.69.96.202:6081/arcgis/rest/services/Utilities/Geometry/GeometryServer"
												},
									},

									
							
							]
						},
						"mapResources" : {
							type : "主专题图",
							"id" : "6de6874a-6c11-456f-8a51-904c5c3b7929",
							name : "大场景+航站楼",
							baseMap : [{
								type : "切片",
								name : "大场景",
								id : "b15b2630-b8fa-4766-ba78-5a72e173541f",
								url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/BNAH_DCJ_zdy3/MapServer",
								display:true,
							/*	xmax : 12971893.628383232,
								xmin : 12946718.473866256,
								ymax : 4799738.439663701,
								ymin : 4787051.643456776*/
							},
							{
								type : "切片",
								name : "大场景蓝背景",
								id : "b15b2630-b8fa-4766-ba78-5a72e1735412",
								url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/BNAH_DCJ_zdy_blue2/MapServer",
								display:false,
							/*	xmax : 12971893.628383232,
								xmin : 12946718.473866256,
								ymax : 4799738.439663701,
								ymin : 4787051.643456776*/
							}
							],
							baseElement : [
								
									{
										type : "要素",
										name : "大场景监控",
										id : "7ca2df22-a6c5-4854-8084-18b406fa3bf4",
										url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_CX_zdy/FeatureServer/0",
										display:false,
									},
									{
										type : "要素",
										name : "航路节点",
										id : "02d5971e-136b-458b-a3ed-6d14971fceb5",
										url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_CX_zdy/FeatureServer/1",
										display:false,
									},
									{
										type : "要素",
										name : "航路兴趣点",
										id : "02d5971e-136b-458b-a3ed-6d14971fceb6",
										url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_CX_zdy/FeatureServer/2",
										display:false,
									},
									{
										type : "要素",
										name : "航路线",
										id : "02d5971e-136b-458b-a3ed-6d14971fceb7",
										url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_CX_zdy/FeatureServer/3",
										display:false,
									},
									{
										type : "要素",
										name : "地面车辆运行兴趣点",
										id : "02d5971e-136b-458b-a3ed-6d14971fceb8",
										url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_CX_zdy/FeatureServer/4",
										display:false,
									},
									{
										type : "要素",
										name : "地面车辆运行路径",
										id : "02d5971e-136b-458b-a3ed-6d14971fceb9",
										url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_CX_zdy/FeatureServer/5",
										display:false,
									},
									{
										type : "要素",
										name : "地面车辆运行路径节点",
										id : "02d5971e-136b-458b-a3ed-6d14971fce10",
										url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_CX_zdy/FeatureServer/6",
										display:false,
									},
									{
										type : "要素",
										name : "除冰位",
										id : "02d5971e-136b-458b-a3ed-6d14971fce11",
										url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_CX_zdy/FeatureServer/7",
										display:false,
									},
									{
										type : "要素",
										name : "除冰坪",
										id : "02d5971e-136b-458b-a3ed-6d14971fce12",
										url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_CX_zdy/FeatureServer/8",
										display:false,
									},
									{
										type : "要素",
										name : "机位点",
										id : "02d5971e-136b-458b-a3ed-6d14971fce13",
										url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_CX_zdy/FeatureServer/9",
										display:false,
									},
									{
										type : "要素",
										name : "机位面",
										id : "02d5971e-136b-458b-a3ed-6d14971fce14",
										url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_CX_zdy/FeatureServer/10",
										display:false,
									}
								
							],
							GeometryServices:{
								url:"http://121.69.96.202:6081/arcgis/rest/services/Utilities/Geometry/GeometryServer"
							},
							"childrens" : [
									{
										type : "专题图",
										name : "五层",
										id : "2f8ce698-53c6-4cce-aade-1ae819015dc2",
										baseMap : [ {
											type : "切片",
											name : "五层",
											id : "9d85129e-7dd8-4d6f-b411-72b0bf4600c0",
											url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4F5_BNAH/MapServer",
										} ],
										baseElement : [
												{
													type : "要素",
													name : "五层运行资源",
													id : "ff6ecb05-b84d-487d-9a79-0c90d149179f",
													childrens : [
															{
																type : "要素",
																name : "五层房间",
																id : "d2796daf-8739-43aa-b0b4-9477c0390418",
																childrens : [ {
																	baseElement : [
																			{
																				type : "要素",
																				name : "五层房间点",
																				id : "7ca2df22-a6c5-4854-8084-18b406fa3354",
																				url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_FS/FeatureServer/7",
																			},
																			{
																				type : "要素",
																				name : "五层房间面",
																				id : "02d5971e-136b-458b-a3ed-6d14976fceb2",
																				url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_FS/FeatureServer/8",
																			}

																	]
																} ]

															},

													]

												}, ],
												GeometryServices:{
													url:"http://121.69.96.202:6081/arcgis/rest/services/Utilities/Geometry/GeometryServer"
												},
									/*
									 * baseDynamic:[ ]
									 */
									},
									{
										type : "专题图",
										name : "四层",
										id : "3f8424cb-38b3-48be-9005-3db573c72141",
										baseMap : [ {
											type : "切片",
											name : "四层",
											id : "0e924802-88ff-4064-a288-e8da2c15ec31",
											url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4F4_BNAH/MapServer",
										} ],
										baseElement : [
												{
																type : "要素",
																name : "四层房间",
																id : "d2796daf-8739-43aa-b0b4-9477c03904f8",
																childrens : [ {
																	baseElement : [
																			{
																				type : "要素",
																				name : "四层房间点",
																				id : "7ca2df22-a6c5-4854-8084-18b406fa3bf4",
																				url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_FS/FeatureServer/6",
																			},
																			{
																				type : "要素",
																				name : "四层房间面",
																				id : "02d5971e-136b-458b-a3ed-6d14971fceb2",
																				url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_FS/FeatureServer/17",
																			}

																	]
																} ]

															}],
												GeometryServices:{
													url:"http://121.69.96.202:6081/arcgis/rest/services/Utilities/Geometry/GeometryServer"
												},
									},
									{
										type : "专题图",
										name : "三层",
										id : "3f8424cb-38b3-48be-9005-3d6563c72141",
										baseMap : [ {
											type : "切片",
											name : "三层",
											id : "0e924802-88ff-4064-a288-e8da2c15ec31",
											url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4F3_BNAH/MapServer",
										} ],
										baseElement : [
												{
													
													type : "要素",
													name : "三层运行资源",
													id : "de8da56a-b466-462d-8770-a96cfac72d13",
													childrens : [
																	{
																		type : "要素",
																		name : "三层房间点",
																		id : "513fcc72-4c06-4669-93a7-190b56d09606",
																		url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_FS/FeatureServer/5",
																	},
																	{
																		type : "要素",
																		name : "三层房间面",
																		id : "513fcc72-4c06-4669-93a7-10bb6d09606",
																		url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_FS/FeatureServer/24",
																	}  
																]
												}
												 ],
												GeometryServices:{
													url:"http://121.69.96.202:6081/arcgis/rest/services/Utilities/Geometry/GeometryServer"
												},
									},
									
									{
										type : "专题图",
										name : "二层",
										id : "3f8424cb-38b3-48be-9005-3d3563c72141",
										baseMap : [ {
											type : "切片",
											name : "二层",
											id : "0e924802-88ff-4064-a288-e8da2c15ec31",
											url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4F2_BNAH/MapServer",
										} ],
										baseElement : [
												{
													
													type : "要素",
													name : "二层运行资源",
													id : "de8da56a-b466-462d-8770-a96cfac72d13",
													childrens : [
																{
																		type : "要素",
																		name : "二层房间点",
																		id : "513fcc72-4c06-4669-93a7-1dbb6d09606",
																		url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_FS/FeatureServer/4",
																	},
																	{
																		type : "要素",
																		name : "二层房间面",
																		id : "513fcc72-4c06-4669-93a7-tbb6d09606",
																		url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_FS/FeatureServer/31",
																	}  
																]
												} ],
												GeometryServices:{
													url:"http://121.69.96.202:6081/arcgis/rest/services/Utilities/Geometry/GeometryServer"
												},
									},
									
									{
										type : "专题图",
										name : "一层",
										id : "3f8424cb-38b3-48be-9005-7db563c72141",
										baseMap : [ {
											type : "切片",
											name : "一层",
											id : "0e924802-88ff-4064-a288-e8da2c15ec31",
											url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4F1_BNAH/MapServer",
										} ],
										baseElement : [
												{
													
													type : "要素",
													name : "一层运行资源",
													id : "de8da56a-b466-462d-8770-a96cfac72d13",
													childrens : [
																{
																		type : "要素",
																		name : "一层房间点",
																		id : "513fcc72-4c06-4669-93a7-1903d09606",
																		url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_FS/FeatureServer/3",
																	},
																	{
																		type : "要素",
																		name : "一层房间面",
																		id : "513fcc72-4c06-4669-93a7-190b56d09606",
																		url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_FS/FeatureServer/37",
																	}  
																]
												}],
												GeometryServices:{
													url:"http://121.69.96.202:6081/arcgis/rest/services/Utilities/Geometry/GeometryServer"
												},
									},
									{
										type : "专题图",
										name : "B1",
										id : "3f8424cb-38b3-48be-9005-34b563c72141",
										baseMap : [ {
											type : "切片",
											name : " B1",
											id : "0e924802-88ff-4064-a288-e8da2c15ec31",
											url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4B1_BNAH/MapServer",
										} ],
										baseElement : [
												{
													
													type : "要素",
													name : "地下一层运行资源",
													id : "de8da56a-b466-462d-8770-a96cfac72d13",
													childrens : [
																{
																		type : "要素",
																		name : "地下一层房间点",
																		id : "513fcc72-4c06-4669-93a7-190bb6d09606",
																		url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_FS/FeatureServer/1",
																	},
																	{
																		type : "要素",
																		name : "地下一层房间面",
																		id : "513fcc72-4c06-4669-93a7-1907b6d09606",
																		url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_FS/FeatureServer/49",
																	}  
																]
												} ],
												GeometryServices:{
													url:"http://121.69.96.202:6081/arcgis/rest/services/Utilities/Geometry/GeometryServer"
												},
									},
									{
										type : "专题图",
										name : "B2",
										id : "3f8424cb-38b3-48be-9005-35b563c72141",
										baseMap : [ {
											type : "切片",
											name : "B2",
											id : "0e924802-88ff-4064-a288-e8da2c15ec31",
											url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4B2_BNAH/MapServer",
										} ],
										baseElement : [
												{
													
													type : "要素",
													name : "地下二层运行资源",
													id : "de8da56a-b466-462d-8770-a96cfac72d13",
													childrens : [
																{
																		type : "要素",
																		name : "地下二层房间点",
																		id : "513fcc72-4c06-4669-93a7-190bb619606",
																		url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_FS/FeatureServer/2",
																	},
																	{
																		type : "要素",
																		name : "地下二层房间面",
																		id : "513fcc72-4c06-4669-93a7-190bb99606",
																		url : "http://121.69.96.202:6081/arcgis/rest/services/BNAH_ZDY/T4_BNAH_FS/FeatureServer/44",
																	}  
																]
												}],
												GeometryServices:{
													url:"http://121.69.96.202:6081/arcgis/rest/services/Utilities/Geometry/GeometryServer"
												},
									},

									
							
							]
						},
						"locationService" : { // 定位服务
							"T1F1旅客" : {
								"type" : "位置服务",
								"url" : "http://121.69.96.202:6081/arcgis/rest/services/XFZD/ZBAA_Resource2/FeatureServer/0",
								"id" : 2,
								"dataRectangle" : {
									"" : "",
									"" : "",
									"" : "",
									"" : ""
								}
							// 矩形范围 最大x 最小x 最大y 最小y
							}
						},
						"flowServices":{
							"aircraft" :{
								"type" : "飞机实时数据",
								"url" : "http://centos18.esrichina.com:6443/arcgis/rest/services/two-dimensional-aircraft-streamservice/StreamServer",
							},
							"car" :{
								"type" : "车辆实时数据",
								"url" : "http://centos18.esrichina.com:6443/arcgis/rest/services/two-dimensional-car-streamservice/StreamServer",
								
							},
							"person" :{
								"type" : "人实时数据",
								"url" : "http://centos18.esrichina.com:6443/arcgis/rest/services/two-dimensional-person-streamservice/StreamServer",
							}
						},
						"trackrePlayServices":{
							"aircraft" :{
								"type" : "飞机历史",
								"url" : "http://centos17.esrichina.com/server/rest/services/Hosted/aircraft-featureLayer-streamservice-00/FeatureServer/0"
							},
							"car" :{
								"type" : "车辆历史",
								"url" : "http://centos17.esrichina.com/server/rest/services/Hosted/car-featureLayer-streamservice/FeatureServer/0"
							},
							"person" :{
								"type" : "人员历史",
								"url" : "http://centos17.esrichina.com/server/rest/services/Hosted/person-streamLayer-streamservice/FeatureServer/0"
							}
						}

					};
					_this.keys=function(){
						var key=new Array();
						for(var i in BNDirectory.arrayList){
					    　　key.push(i);
					　　}
						return key;
					};
					
					// 根据ip拿到资源
					_this.getDirectory = function(id) {
						if (util.isNotEmpty(id)) {
							return arrayList[id];
						} else {
							return arrayList;
						}

					};
					if (util.isNotEmpty(Callback)) {
						Callback(_this);
					}

					return _this;

				} else {
					if (util.isNotEmpty(Callback)) {
						Callback(new _person());
					}

					return new _person();
				}
			}
			_person.prototype = {
				constructor : _person,
				drink : "sd",
			};
			return _person;

		});
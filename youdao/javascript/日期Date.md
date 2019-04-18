##### Date对象
    Date()  返回当前时间Date格式 
    "Mon Apr 30 2018 01:05:57 GMT+0800 (中国标准时间)"
    
    new Date()  返回当前时间字符串格式 
    Mon Apr 30 2018 01:07:10 GMT+0800 (中国标准时间)
    
##### 格式转换
    1. 时间戳 转换成 Date格式 
    new Date(1566666666666) // Sun Aug 25 2019 01:11:06 GMT+0800 (中国标准时间)
    
    2. 日期字符串 转换成 Date格式
    new Date('January 6, 2018') // Sat Jan 06 2018 00:00:00 GMT+0800 (中国标准时间)
    
    3. 年、月、日、小时、分钟、秒、毫秒 转换成 Date格式
    new Date(2018, 8, 8, 8, 8, 8, 8) // Sat Sep 08 2018 08:08:08 GMT+0800 (中国标准时间)
    
    4. 各种支持的格式  - / , 
    new Date('2018-8-8')
    new Date('2018/8/8')
    new Date('8/8/2018')
    new Date('2018-August-08')
    new Date('2018, August, 08')
    new Date('2018 August, 08')
    new Date('2018, August 08')
    // Wed Aug 08 2018 00:00:00 GMT+0800 (中国标准时间)
    
    5. 其他格式转换成时间戳
    new Date(time).valueOf()
    new Date(time).getTime()
    new Date('2018-08-08 08:08:08').getTime()   // 1533686888000
    new Date('Wed Aug 08 2018 00:00:00 GMT+0800 (中国标准时间)').getTime()  // 1533657600000
    
##### 计算代码执行的时间间隔
    var start = new Date();
    // 代码执行
    var end = new Date();
    代码执行时间 = end - start;
    
##### Date的get方法
    getTime()：返回实例距离1970年1月1日00:00:00的毫秒数，等同于valueOf方法。
    getDate()：返回实例对象对应每个月的几号（从1开始）。
    getDay()：返回星期几，星期日为0，星期一为1，以此类推。
    getYear()：返回距离1900的年数。
    getFullYear()：返回四位的年份。
    getMonth()：返回月份（0表示1月，11表示12月）。
    getHours()：返回小时（0-23）。
    getMilliseconds()：返回毫秒（0-999）。
    getMinutes()：返回分钟（0-59）。
    getSeconds()：返回秒（0-59）。
    getTimezoneOffset()：返回当前时间与 UTC 的时区差异，以分钟表示，返回结果考虑到了夏令时因素。

##### 本年度倒计时天数
    function leftDays() {
      var today = new Date();
      var endYear = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999);
      var msPerDay = 24 * 60 * 60 * 1000;
      return Math.round((endYear.getTime() - today.getTime()) / msPerDay);
    }
    
##### 设置时间
    var d = new Date();

    // 将日期向后推1000天
    d.setDate(d.getDate() + 1000);
    // 将时间设为6小时后
    d.setHours(d.getHours() + 6);
    // 将年份设为去年
    d.setFullYear(d.getFullYear() - 1);
    
##### 时间戳返回 月日 或者 时分
    function getFormatDate(time) {
        if (!time) return '';
        var date = new Date(time);
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
			+ seperator2 + date.getSeconds();
			
		var yue = currentdate.split(' ')[0].split('-')[1];
		var ri = currentdate.split(' ')[0].split('-')[1];
		var monthStr = yue + '月' + ri + '日';

		var H = currentdate.split(' ')[1].split(':')[0];
		var F = currentdate.split(' ')[1].split(':')[1];
		var hourStr = H + '时' + F + '分';

        return {
			'month': monthStr,
			'hour': hourStr
		};
	}
	
	// 获取月日
	getFormatDate(time).month
	// 获取时分
	getFormatDate(time).month
	
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    






    
##### js 浮点数运算出现BUG问题
    function toNumber(num) {
        return num = Math.round(num * 100) / 100;
    }
    
##### js处理金额显示
    function toMoney(amount) {
        amount = amount.toString().replace(/\$|\,/g, '');
        if (isNaN(amount)) {
            amount = "0";
        }
        var sign = (amount == (amount = Math.abs(amount)));
        amount = Math.floor(amount * 100 + 0.50000000001);
        var cents = amount % 100;
        amount = Math.floor(amount / 100).toString();
        if (cents < 10) {
            cents = "0" + cents
        }
        for (var i = 0; i < Math.floor((amount.length - (1 + i)) / 3); i++) {
            amount = amount.substring(0, amount.length - (4 * i + 3)) + ',' + amount.substring(amount.length - (4 * i + 3));
        }
    
        return (((sign) ? '' : '-') + amount + '.' + cents);
    }
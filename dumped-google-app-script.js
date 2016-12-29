var MAP = {}


function lunchCost(costs, orders) {
  costs = ensureInputIsArray(costs);
  
  orders = ensureInputIsArray(orders);
 
  costsize = costs.length;
  ordersize = orders.length;
  max = Math.min(costsize, ordersize);
  
  result = 0;
  
  for(i=0;i<max;i++){
    /* Parsing ith price string */ 
    costMap = parseCost(costs[i][0]);
    if (!costMap){
      continue;
    }
    
    /* Checking if order is placed or not */
    order = orders[i][0];
    if(isEmpty(order) || order == ""){ continue; }
    
    /* Picking value from cost map */
    order = order.trim();
    if(costMap[order]){
      result += +(costMap[order]);
    } else if(costMap['common']) {
      result += +(costMap['common']);
    } else {
      throw new Error("Input of day " + (i+1) +" is '" + order + "' which is not correct");
    }
  }
  return result;
}


function parseCost(cost) {
  if(toType(cost) === 'number'){
    MAP = {};
    MAP['common'] = cost;
  } else { 
    if(isEmpty(cost)) {
      return MAP;
    }    
    MAP = {};
    parts = cost.split(/\s*,\s*/);
    for(j=0;j<parts.length;j++){
      aPart = parts[j];
      prices = aPart.split(/\s*:\s*/);
      if(prices.length == 1){
        //Only one price applicable for all orders
        MAP['common'] = parts[0];
      } else if(prices.length == 2){
        //type specific prices provided
        type = prices[0].trim();
        cost = prices[1].trim();
        MAP[type] = cost;
      } else {
        throw new Error("Malformed price configuration. Please dont be a bad guy.");
      }
    }
  }
  return MAP;
}

function isEmpty(str){
    if(!str || !str.length) {
      return true;
    } else {
      return false;
    }
}

function toType(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

function ensureInputIsArray(element){
  if(toType(element) != 'array'){
    tmp = [];
    tmp[0]=[element];
    return tmp;
  }
  return element;
}

function dailyOrderSummary(orders){
  orders = ensureInputIsArray(orders);
  countmap = {};
  summary = "summary is: ";
  size = orders[0].length;
  for(i=0;i<size;i++){
    order = orders[0][i];
    if(!isEmpty(order)){
      if(!countmap[order]){
        countmap[order] = 0;
      }
      countmap[order] += 1 ;
    }
  }
  
  summary = "";
  total = 0;
  for(var o in countmap){
    summary = summary + o + ":" + countmap[o] + ", ";
    total += countmap[o];
  }
  return "" + total + " : " + summary;
}

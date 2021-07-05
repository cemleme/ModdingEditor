export default {
    namespaced:true,
    getters: {
        getJSONdata: (_, _2, _3, rootGetters) => {
          return rootGetters.getComponents.reduce((acc, val) => {
            acc = acc || {};
    
            const title = val["title"];
            let exportTitle = rootGetters.getComponentDatas.find((comp) => comp.title == title).exportTitle;
            if(!exportTitle) exportTitle = title;
    
            if(Array.isArray(val["value"]))
            {
              acc[exportTitle] = [];
              for(const item of val["value"]){
                let obj = {};
    
                obj.optionId = item.optionId;
                if(item.count) obj.count = item.count;
                if(item.type)
                {
                  obj.type = item.type;
                  if(item.type === "text") obj.TextValue = item.input;
                  if(item.type === "int") obj.IntValue = item.input;
                  if(item.type === "bool") obj.BoolValue = item.input;
                }
    
                acc[exportTitle].push(obj);
              }
            }
            else{
              
              acc[exportTitle] = val["value"];
            }
            
            return acc;
          }, {});
        },
    }
}
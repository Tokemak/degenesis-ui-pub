
function positionTooltip() {

    const dot = document.getElementById("graphdot");
    const tooltip = document.getElementById("graphTooltip");

    if (!dot) {
        if (window.tvl < 1000000) {
            return;
        }
        setTimeout(() => {
            // eslint-disable-next-line no-unused-vars
            positionTooltip();
        }, 100);
        return;
    } else {
        tooltip.style.display = "none";
    }

    var doc = document.documentElement;
    var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

    const pos = dot.getBoundingClientRect();
        
    tooltip.style.top = pos.top + top - 35 + "px";
    tooltip.style.left = pos.left + left + 7 + "px";

    tooltip.style.display = window.tvl > 1000000 ? "flex" : "none";

    if (window.tvl >= 24000000) {
        try 
        {
        tooltip.style.left = pos.left + left + 7 - tooltip.getBoundingClientRect().width + "px";
        }catch{}
    }

    const toke = document.querySelector("#graphTooltip .pcts .toke");
    const farm = document.querySelector("#graphTooltip .pcts .farm");
    toke.innerHTML = ((1 - window.farmPct)*100).toFixed(0) + "% SWAP";
    farm.innerHTML =(window.farmPct*100).toFixed(0) + "% FARM";

    let tokePrice = 2;
    if (window.tvl > 6000000) {
        tokePrice = window.tvl / 3000000;
    }
    if (window.tvl > 24000000) {
        tokePrice = 8;
    }
    const t = document.querySelector("#graphTooltip > .toke");
    t.innerHTML = "$" + tokePrice.toFixed(2) + "/TOKE";

    const ticks = document.querySelectorAll(".recharts-xAxis .recharts-cartesian-axis-tick-value");

    for(let i = 0; i < ticks.length; i++ ) {
        if ((i+1) * 1000000 < window.tvl) {
            ticks.item(i).setAttribute("fill", "#B5FF00");
        } else {
            ticks.item(i).setAttribute("fill", "#707070");
        }
    }

}






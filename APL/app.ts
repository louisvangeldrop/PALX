// https://github.com/Microsoft/TypeScript/wiki

//import {Dyadic} from "Dyadic"     // In dyadic.ts export toeveoegen aan namespace Dyadic
//import {APL} from "diversen";

//import vector = Dyadic.Vector
//import scalar = Dyadic.Scalar

class APLXTest {
    element: HTMLElement;
    span: HTMLElement;
    spanCPU: HTMLSpanElement;
    timerToken: number;
    /**
    * Creates a new HTMLElement
    */
    constructor(element: HTMLElement) {
        this.element = element;
        this.element.innerHTML += "De tijd is: ";
        this.span = document.createElement('span') as HTMLSpanElement;
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();

        //      this.element.innerHTML += "CPU time is: ";
        this.spanCPU = document.createElement('span') as HTMLSpanElement;
        this.element.appendChild(this.spanCPU);
        this.spanCPU.innerHTML = "<br/>"
    }

    start() {
        // console.profile('Number.iota')
        //  var aplg= apl.gradeDown
        const vector = Dyadic.Vector
        let scalar = Dyadic.Scalar
        var parms = location.search.split('?')
        var aantal: number = parms.length > 1 ? parseFloat(parms[1].replace('/', ' ')) : 5e6

        var spanCPU = this.spanCPU
        var nestedArray = [4, 5][APLPrefix + "indexGenerator"]
        var range1tot10 = ((10)[APLPrefix + "indexGenerator"]).plus(1)
        var testje = [3, 4, 5][APLPrefix + "aplReduce"](scalar.minus)
        this.spanCPU.innerHTML += `\n Aantal elementen = ${aantal} <br />`
        //[ll,aantal]=[aantal,ll]
        var t0: number
        var startPerformance = performance.now()
        var dd: number[] //= aantal.deal(aantal)
        var cc: number
        var rr
        var ev=eval('(10).indexGenerator')
        rr = range1tot10.domino(range1tot10)
        cc=[2,2,2,2].decode([1,2,3,4])
        showPerformance(spanCPU, performance.now(), 'deal', dd = aantal[APLPrefix + "deal"](aantal))
        showPerformance(spanCPU, performance.now(), 'depth', cc = dd[APLPrefix + "depth"])
        showPerformance(spanCPU, performance.now(), 'depthLength', cc = dd[APLPrefix + "depthLength"])
        showPerformance(spanCPU, performance.now(), 'enlist', dd = dd[APLPrefix + "enlist"])
        showPerformance(spanCPU, performance.now(), 'reshape', rr = (aantal[APLPrefix + "reshape"](dd)))
        //var maxValue = dd.aplReduce((l, r) => { return Math.max(l, r) })
        var apldd   //:number[]

        var aplcc = new APL.Vector(null, 10)

        showPerformance(spanCPU, performance.now(), 'APLVector', apldd = new APL.Vector(dd))
        showPerformance(spanCPU, performance.now(), "signum", dd.signum)

        showPerformance(spanCPU, performance.now(), "identity", dd.same)
        //var ss = dd.slice()
        //ss[0] = 0
        t0 = performance.now()
        //  var qq = dd.gradeDown  //   QS Chrome is even snel als Array.sort met index. Bij IE Array.sort veel sneller
        try {
            showPerformance(spanCPU, performance.now(), 'gradeup/down', dd.gradeUp)
        }
        catch (err) { }
        finally { }

        var cpuGradeUp = performance.now() - t0
        //this.spanCPU.innerHTML += "\n gradeUp/Down CPU-tijd: " + t0.toString() + "<br />"
        //t0 = performance.now()
        //qq = dd.sort()
        //t0 = performance.now() - t0
        // this.spanCPU.innerHTML += "\n Array.sort CPU-tijd: " + t0.toString() + "<br />"
        //     var zz = gradeUpSort(dd)       // [2,3,4,5,4,3,2])
        //var sign = dd.sign
        //   sign=dd.sign()
        //var bb=dd+dd not supported
        var tn = (<any>10).plus(9)
        showPerformance(spanCPU, performance.now(), "negate", dd.negative)
        showPerformance(spanCPU, performance.now(), "times", dd.times(dd))
        showPerformance(spanCPU, performance.now(), "divide", dd.divide(dd))
        showPerformance(spanCPU, performance.now(), "map -alpha", dd.map((alpha) => { return -alpha }))
        showPerformance(spanCPU, performance.now(), 'ceiling', dd.ceiling)
        showPerformance(spanCPU, performance.now(), 'rotate', [-10].rotate(dd))

        performance.mark("Array.APLreduce start")
        var min = dd.aplReduce(scalar.minus)
        performance.mark("Array.APLreduce stop")
        showPerformance(spanCPU, performance.now(), "Array.reduceRight", dd.reduceRight(scalar.plus))
        //       console.log(`min: ${min} som: ${som}`)

        performance.measure("Array.APLreduce", "Array.APLreduce start", "Array.APLreduce stop")
        // Print marks
        var perfMarks = performance.getEntriesByType("measure");   // "mark"
        var perfEntries = performance.getEntries()
        for (var i = 0; i < perfMarks.length; i++) {
            this.spanCPU.innerHTML +=
                "Name: " + perfMarks[i].name + " - " +
                "CPU Time: " + perfMarks[i].duration + "<br />";  //  perfMarks[i].startTime
        }
        var totalCpu = performance.now() - startPerformance
        this.spanCPU.innerHTML += `\n totale CPU-tijd: ${totalCpu}<br />`
        this.spanCPU.innerHTML += `\n totale CPU-tijd-gradeUp: ${totalCpu - cpuGradeUp}<br />`
        this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);
    }

    stop() {
        clearTimeout(this.timerToken);
    }
}

var showPerformance = function (spanCPU: HTMLElement, performanceNow, text: string, expression) {
    //   var result = expression
    console.time("")
    var t0 = performance.now() - performanceNow
    spanCPU.innerHTML += `\n ${text} CPU-tijd: ${t0.toString()} <br />`
    // return `\n ${text} CPU-tijd: ${t0.toString() } <br />`
}

window.onload = () => {
    var el = document.getElementById('content');
    var greeter = new APLXTest(el);
    greeter.start();
};
/*
 * ADS1115 extension
 * Restrictions:
 *  single shot mode
 *  single-ended inputs only
 *  no comparator useage
 */
enum FSR {
    //% block="6.144V"
    V6,
    //% block="4.096V"
    V4,
    //%block="2.048V"
    V2,
    //% block="1.024V"
    V1,
    //% block="0.512V"
    V512m,
    //% block="0.256V"
    V256m
}


//% weight=20 color=#009900 icon="\u25c0" block="ADS1115"
namespace ADS1115 {
    /* register pointer value */
    let REG_CONVERSION = 0
    let REG_CONFIG = 1
    /* bitfield initial values */
    let OS=1
    let PGA=0
    let addr=0x48
    let DIS = 3


    
    //% blockId="ADS1115_SET_FSR" block="set FSR %fsr"
    //% fsrValue.defl=V6
    //% weight=52 blockGap=8
    //% parts=ADS1115 trackArgs=0
    export function setFSR(name: FSR){
        switch(name){
          case FSR.V6: PGA=0;
            break;
          case FSR.V4: PGA=1
            break;
          case FSR.V2: PGA=2;
            break;
          case FSR.V1: PGA=3;
            break;
          case FSR.V512m: PGA=4;
            break;
          case FSR.V256m: PGA=5;
        
        }
        
    }
    
    //% blockId="ADS1115_SET_ADDR" block="set I2C address %addr"
    //% addrValue.defl=72
    //% weight=52 blockGap=8
    //% parts=ADS1115 trackArgs=0
    export function setADDR(addrValue: number){
        addr = addrValue;
        serial.writeLine("addr = " + addrValue);
        
    }
    
    //% blockId="ADS1115_READ_ADC" block="readADC %channel"
    //% weight=52 blockGap=8
    //% parts=ADS1115 trackArgs=0
    export function readADC(channel: number) number {
        //write to the Configuration register
        let CONFIG_HI = OS<<7 | channel<<4 | PGA << 1 | MODE;
        let CONFIG_LO = DIS;
        let buf = pins.createBuffer(3);
        buf[0] = REG_CONFIG
        buf[1] = CONFIG_HI;
        buf[2] = CONFIG_LO;
        pins.i2cWriteBuffer(addr, buf);
        //write to the pointer to enable read from conversion reg
        pins.i2cWriteNumber(REG_CONVERSION, reg, NumberFormat.UInt8BE);
        let result = pins.i2cReadNumber(addrValue, NumberFormat.Int16BE)
        //TODO - add scaling (8000 for 4V FSR)
        serial.writeLine("reading = " + result);
        return(result);


        
    }
    
}

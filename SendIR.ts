enum IrProtocol {
    //% block="Sharp"
    Sharp = 1,
    //% block="NEC"
    NEC = 2,
    //% block="Panasonic"
    Panasonic = 3,
    //% block="Sony"
    Sony = 3,
    // Add more protocols as needed
}
enum FanSpeed {
    //% block="Low"
    Low = 1,
    //% block="Medium"
    Medium = 2,
    //% block="Fast"
    Fast = 3,
    // Add more protocols as needed
}

enum Power {
    //% block="On"
    On = 1,
    //% block="Off"
    Off = 0,
}

//% color=#0fbc11 icon="\uf1eb" block="Nikola AC remote "
namespace NikolaIRSender 
{   

    /**
    * @param tx_pin the new transmission pin, eg: SerialPin.P0
    * @param rx_pin the new reception pin, eg: SerialPin.P1
    */
    //% blockId="IR create" block="IR Sender on TX Pin %tx_pin and RX Pin %rx_pin "
    //% weight=91 blockGap=8
    //% parts="nikolaIR_sender"
    export function setup(tx_pin: SerialPin, rx_pin:SerialPin): void
    { 
        serial.redirect(tx_pin, rx_pin, 115200)
    }
    /**
    * @param protocol the new transmission pin, eg: IrProtocol.Sharp
    * @param fan the new reception pin, eg: FanSpeed.Low
    * @param temp the new reception pin, eg: 16
    * @param power the new reception pin, eg: On
    */
    //% blockId="IR sending" block="sending AC command with protocol %protocol fan speed %fan temp %temp power %power"
    //% weight=90 
    //% temp.min = 16 temp.max = 30 
    //% parts="nikolaIR_sender"
    export function sending(protocol: IrProtocol, fan: FanSpeed , temp: number, power : Power): void
    {
        let message =""

        if ( protocol  < 10)
        {message = message + "0"}

        if(temp < 16)
        {
            temp = 16
        }
        else if (temp > 30) 
        {
            temp = 30
        }

        message = message + protocol + fan + temp + power
        
        serial.writeString(message)
        basic.pause(1000)
    }
}

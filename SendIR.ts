enum IrProtocol {
    //% block="Sharp"
    Sharp = 1,
    //% block="NEC"
    NEC = 2,
    //% block="Panasonic"
    Panasonic = 3,
    //% block="Sony"
    Sony = 4,
    //% block="Daikin"
    Daikin = 5,
    //% block="Daikin128"
    Daikin128 = 6,
    //% block="Daikin152"
    Daikin152 = 7,
    //% block="Daikin160"
    Daikin160 = 8,
    //% block="Daikin176"
    Daikin176 = 9,
    //% block="Daikin2"
    Daikin2 = 10,
    //% block="Daikin216"
    Daikin216 = 11,
    //% block="Daikin64"
    Daikin64 = 12,
    
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
    let prtcl = IrProtocol.Sharp;
    let fspd = FanSpeed.Low;
    let temp =  25;
    let pwr = Power.On;

    export function sendingcommand(protocol: IrProtocol, fan: FanSpeed, temperature: number, power: Power): void {

        let message = ""

        if (protocol < 10) { message = message + "0" }

        if (temperature < 16) {
            temperature = 16
        }
        else if (temperature > 30) {
            temperature = 30
        }

        message = message + protocol + fan + temperature + power

        serial.writeString(message)
        basic.pause(1000)
    }

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
    * @param protocol, eg: IrProtocol.Sharp
    * @param fan , eg: FanSpeed.Low
    * @param temperature , eg: 16
    * @param power, eg: On
    */
    //% blockId="IR sending packet" block="sending AC command with protocol %protocol fan speed %fan temp %temp power %power"
    //% weight=90 
    //% temp.min = 16 temp.max = 30 
    //% parts="nikolaIR_sender"
    export function sendingpacket(protocol: IrProtocol, fan: FanSpeed , temperature: number, power : Power): void
    {
       sendingcommand(protocol,fan,temperature,power)
    }
    
    //% blockId="IR sending individual" block="sending AC command "
    //% weight=90 
    //% parts="nikolaIR_sender"
    export function sendingIndividual(): void {
        sendingcommand(prtcl, fspd, temp, pwr)
        basic.pause(100)
    }

    /**
    * @param protocol the new transmission pin, eg: IrProtocol.Sharp
    */

    //% blockId="IR Setting Protocol" block="setting AC command with protocol %protocol"
    //% weight=90 
    //% parts="nikolaIR_sender"
    export function setprotocol (protocol: IrProtocol) 
    {
        prtcl = protocol
    }
    /**
    * @param fan the new reception pin, eg: FanSpeed.Low
    */
    //% blockId="IR Setting fan speed" block="setting AC command with fan speed %fan"
    //% weight=90 
    //% parts="nikolaIR_sender"
    export function setfan(fan: FanSpeed) {
        fspd = fan
    }
    /**
    * @param temperature the new reception pin, eg: 16
    */
    //% blockId="IR Setting temperature" block="setting AC command with temp %temp "
    //% weight=90 
    //% parts="nikolaIR_sender"
    export function settemp(temperature: number) {
        temp = temperature
    }
    /**
    * @param power the new reception pin, eg: On
    */
    //% blockId="IR Setting power" block="setting AC command with power %power"
    //% weight=90 
    //% parts="nikolaIR_sender"
    export function setpower(power: Power) {
        pwr=power
      } 
}

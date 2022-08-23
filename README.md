## Introduction
* This extension is used to interface a microbit to an ADS1115 analog-to-digital converter over the I2C bus. The ADC is widely available as a small board.
* The ADS1115 has 4 channels and the FSR (Full Scale Range) can be programmed to a number of values. Typically we would use the 4.096V range, since the microbit's supply voltage, VDD, is restricted to 3.6V (and the ADC's inputs should not exceed VDD). 
* At present the extension allows only single-ended measurements (between ADC pins A0-3 and GND). Also conversions are performed on demand - when you call the readADC() function.
* You can have up to 8 ADC devices on the bus, and their addresses are determined by wiring ADC pins to various signals (see datasheet). The extension has a function to set each decvice's address (which defaults to 0x48).
## Use as Extension

This repository can be added as an **extension** in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/keble6/pxt-ads1115** and import


const {test, describe, it} = require('node:test');
const assert = require('node:assert');
const {tiMonth, fuelEnergySelector, fuelConsumption, combustionConsumption, electricalConsumption} = require("../calculators/environment")

const electrical_consumption = electricalConsumption(81.14, 200)
const combustion_consumption = combustionConsumption(electrical_consumption)
const fuel_selector = fuelEnergySelector("Diesel")


describe("Enviroment Calculations", () => {

    it('env_ipc', () => { 
        assert.strictEqual(tiMonth(2.8), 0.0023039138595752906)
    })


    describe("FuelEnergySelector colection", () => {
        it("gasoline case", () => {
            assert.deepStrictEqual(fuelEnergySelector("gasoline"),{
                "fuel_price": 16700,
                "fuel_energy": 35.58,
                "emision_factor": 69.25
            })
        })

        it("diesel case", () => {
            assert.deepStrictEqual(fuelEnergySelector("diesel"),{
                "fuel_price": 11795,
                "fuel_energy": 40.7,
                "emision_factor": 74.01
            })
        })
    })

    it("fuelConsuption Test", () => {
        assert.strictEqual(
            fuelConsumption(
                combustion_consumption, 
                fuel_selector["fuel_energy"]), 
            0.04102081879859657
        )
    });
});

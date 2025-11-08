const { Router } = require('express');
const response = require('../../network/response');
const { dummyDataset } = require('../../database/dummyDataset'); // importa correctamente
const router = Router();
const {
    tiMonth,
    fuelEnergySelector, 
    electricalConsumption,
    costElectricalKM,
    combustionConsumption,
    fuelConsumption,
    fuelEfficiency,
    fuelCostKm,
    energyKm,
    emisionKm,
    savedEnergy,
    avoidedEmissions,
    monthlySavings,
    annualSavings,
    youngTree, 
    oldTree,
    energyH2Cylinders,
    energyH2LowPresure,
    energyConsumed,
    hydrogenMass,
    litersRequired
} = require('../../calculators/environment');

// aquí obtienes el objeto de datos
const data = dummyDataset();

router.get('/environment/:ipc/:fes', async (req, res) => {
    try {
        let list = {};

        const ipc = tiMonth(parseFloat(req.params.ipc));
        const fes = fuelEnergySelector(req.params.fes);

        const electrical_consumption = electricalConsumption(data.nominal_energy, data.autonomy_nominal);
        const cost_electrical_km = costElectricalKM(electrical_consumption, data.energy_price);
        const combustion_Consumption = combustionConsumption(electrical_consumption);
        const fuel_consumption = fuelConsumption(combustion_Consumption, fes.fuel_energy);
        const fuel_Efficiency = fuelEfficiency(fuel_consumption);
        const fuel_cost_KM = fuelCostKm(fes.fuel_price, fuel_consumption);
        const energy_KM = energyKm(combustion_Consumption);
        const emision_KM = emisionKm(fes.emision_factor, energy_KM);
        const saved_energy = savedEnergy(combustion_Consumption, electrical_consumption, data.annual_use);
        const avoided_emissions = avoidedEmissions(emision_KM, data.annual_use);
        const monthly_savings = monthlySavings(fuel_cost_KM, cost_electrical_km, data.annual_use);
        const annual_savings = annualSavings(monthly_savings, ipc);
        const young_tree = await youngTree(avoided_emissions);
        const old_tree = await oldTree(avoided_emissions);
        const energy_H2_Cylinders = await energyH2Cylinders(data.nominal_energy);
        const energy_H2_Low_Presure = await energyH2LowPresure(energy_H2_Cylinders);
        const energy_consumed = await energyConsumed(energy_H2_Low_Presure);
        const hydrogen_mass = await hydrogenMass(energy_H2_Low_Presure);
        const liters_required = await litersRequired(hydrogen_mass);

        list = {
            It_month: ipc,
            Fuel_energy_selector: fes,
            Electrical_consumption: electrical_consumption,
            Cost_electrical_KM: cost_electrical_km,
            Combustion_Consumption: combustion_Consumption,
            Fuel_Consumption: fuel_consumption,
            Fuel_Efficiency: fuel_Efficiency,
            Fuel_cost_KM: fuel_cost_KM,
            Energy_KM: energy_KM,
            Emision_KM: emision_KM,
            Saved_energy: saved_energy,
            Avoided_emissions: avoided_emissions,
            Monthly_savings: monthly_savings,
            Annual_savings: annual_savings,
            Young_tree: young_tree,
            Old_tree: old_tree,
            Energy_H2_Cylinders: energy_H2_Cylinders,
            Energy_H2_Low_Presure: energy_H2_Low_Presure,
            Energy_consumed: energy_consumed,
            Hydrogen_mass: hydrogen_mass,
            Liters_required: liters_required
        };

        response.success(req, res, list, 200);
    } catch (error) {
        response.error(req, res, error.message, 500);
    }
});

module.exports = router;

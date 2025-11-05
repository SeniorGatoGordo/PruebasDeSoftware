const { Router } = require('express');
const response = require('../../network/response')
const router = Router();
const ctrl = require('./index');
const {tiMonth,fuelEnergySelector, 
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
    litersRequired} = require('../../calculators/environment')
const tableInjected = 'my_table'
 
 
router.get('/environment/:ipc/:fes', async (req, res) => {
    try {
        let list={}
 
        const ipc=tiMonth(parseFloat(req.params.ipc))
        const fes = fuelEnergySelector(req.params.fes)
        // const electrical_consumption =  electricalConsumption(8.14, 14.7)
        // const cost_electrical_km= costElectricalKM(electrical_consumption,978.81)
        // const combustion_Consumption=combustionConsumption(electrical_consumption)
        // const fuel_consumption=fuelConsumption()
        // const fuel_Efficiency=fuelEfficiency()  
        // const fuel_cost_KM= fuelCostKm()
        // const energy_KM=energyKm()
        // const emision_KM=emisionKm()
        // const saved_energy=savedEnergy()
        // const avoided_emissions=avoidedEmissions()
        // const annual_savings=annualSavings()
        // const monthly_savings=monthlySavings()
        // const young_tree=youngTree()
        // const old_tree=oldTree()
        // const energy_H2_Cylinders=energyH2Cylinders()
        // const energy_H2_Low_Presure=energyH2LowPresure()
        // const energy_consumed=energyConsumed()
        // const hydrogen_mass=hydrogenMass()
        // const liters_required=litersRequired()
        list["It_month"]=ipc
        list["Fuel_energy_selector"]=fes
        // list["Electrical_consumption"]=electrical_consumption
        // list["Cost_electrical_KM"]=cost_electrical_km
        // list["Combustion_Consumption"]=combustion_Consumption
        // list["Fuel_Consumption"]=fuel_consumption
        // list["Fuel_Efficiency"]=fuel_Efficiency
        // list["Fuel_cost_KM"]=fuel_cost_KM
        // list["Energy_KM"]=energy_KM
        // list["Emision_KM"]=emision_KM
        // list["Saved_energy"]=saved_energy
        // list["Avoided_emissions"]=avoided_emissions
        // list["Monthly_savings"]=monthly_savings
        // list["Annual_savings"]=annual_savings
        // list["Young_tree"]=young_tree
        // list["Old_tree"]=old_tree
        // list["Energy_H2_Cylinders"]=energy_H2_Cylinders
        // list["Energy_H2_Low_Presure"]=energy_H2_Low_Presure
        // list["Energy_consumed"]=energy_consumed
        // list["Hydrogen_mass"]=hydrogen_mass
        // list["Liters_required"]=liters_required
 
        response.success(req,res,list,200)  
    } catch (error) {
        response.error(req, res, error.message, 500); 
    }
})
 
module.exports = router ;
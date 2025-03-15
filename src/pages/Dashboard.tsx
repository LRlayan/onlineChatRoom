import CountCard from "../components/dashboard/count-card/CountCard.tsx";
import StatusCard from "../components/dashboard/status-card/StatusCard.tsx";
import List from "../components/unordered-list/List.tsx";
import {useDispatch, useSelector} from "react-redux";
import {EquipmentRootState, getAllEquipment} from "../reducer/EquipmentSlice.ts";
import {useEffect} from "react";
import {AppDispatch} from "../store/store.ts";
import {getAllVehicle, VehicleRootState} from "../reducer/VehicleSlice.ts";
import {getAllStaff, StaffRootState} from "../reducer/StaffSlice.ts";

export function Dashboard() {
    const dispatch = useDispatch<AppDispatch>();
    const equipments = useSelector((state:EquipmentRootState) => state.equipment.equipments);
    const vehicles = useSelector((state:VehicleRootState) => state.vehicle.vehicles);
    const staffs = useSelector((state:StaffRootState) => state.staff.staffs);
    const equCount = equipments.length;
    const vehicleCount = vehicles.length;
    const staffCount = staffs.length;
    let carCount = 0;
    let vanCount = 0;
    let bikeCount = 0;
    let landMasterCount = 0;
    let tractor4WDCount = 0;
    let tankersCount = 0;
    let landVehicleCount = 0;
    let lorryCount = 0;

    let handToolsCount = 0;
    let IrrigationCount = 0;
    let PowerCount = 0;
    let PloughingCount = 0;
    let WeedingCount = 0;
    let HarvestingCount = 0;
    let PostHarvestCount = 0;
    let MonitoringCount = 0;
    let ProtectiveCount = 0;

    let seniorAssistantCount = 0;
    let assistantManagersCount = 0;
    let adminHRCount = 0;
    let officeAssistantsCount = 0;
    let seniorAgronomistsCount = 0;
    let agronomistsCount = 0;
    let soilScientistsCount = 0;
    let seniorTechniciansCount = 0;
    let techniciansCount = 0;
    let supervisorsCount = 0;
    let laborsCount = 0;

    useEffect(() => {
        dispatch(getAllEquipment());
        dispatch(getAllVehicle());
        dispatch(getAllStaff());
    },[dispatch]);

    vehicles.map((vehicle) => {
        const category = vehicle.category;
        if (category === "Car") {
            carCount++;
        } else if (category === "Van") {
            vanCount++;
        } else if (category === "Motorbikes") {
            bikeCount++;
        } else if (category === "Tractors–Land masters") {
            landMasterCount++;
        } else if (category === "Tractors-4WD") {
            tractor4WDCount++;
        } else if (category === "Tankers truck") {
            tankersCount++;
        } else if (category === "Land vehicles") {
            landVehicleCount++;
        } else if (category === "Lorry") {
            lorryCount++;
        }
    });

    equipments.map((equipment) => {
        const type = equipment.equType;
        if (type === "Hand Tools") {
            handToolsCount++;
        } else if (type === "Irrigation Equipment") {
            IrrigationCount++;
        }else if (type === "Power Tools and Machinery") {
            PowerCount++;
        } else if (type === "Ploughing Equipment") {
            PloughingCount++;
        } else if (type === "Weeding and Pest Control Equipment") {
            WeedingCount++;
        } else if (type === "Harvesting Equipment") {
            HarvestingCount++;
        } else if (type === "Post-Harvest Equipment") {
            PostHarvestCount++;
        } else if (type === "Monitoring and Measuring Tools") {
            MonitoringCount++;
        } else if (type === "Protective Equipment") {
            ProtectiveCount++;
        }
    });

    staffs.map((staff) => {
        const designation = staff.designation;
        if (designation === "ASSISTANT MANAGER") {
            assistantManagersCount++;
        } else if (designation === "ADMIN AND HR STAFF") {
            adminHRCount++;
        }else if (designation === "OFFICE ASSISTANT") {
            officeAssistantsCount++;
        } else if (designation === "SENIOR AGRONOMIST") {
            seniorAgronomistsCount++;
        } else if (designation === "AGRONOMIST") {
            agronomistsCount++;
        } else if (designation === "SOIL SCIENTIST") {
            soilScientistsCount++;
        } else if (designation === "SENIOR TECHNICIAN") {
            seniorTechniciansCount++;
        } else if (designation === "TECHNICIAN") {
            techniciansCount++;
        } else if (designation === "SUPERVISOR") {
            supervisorsCount++;
        } else if (designation === "LABOUR") {
            laborsCount++;
        }
    })

    return(
        <>
            <section id="dashboard-sec" className="flex flex-col p-4 w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mb-4">
                    <div className="bg-teal-500 text-gray-900 rounded-lg shadow-md p-6">
                        <CountCard countCardType={"Available Employees"} count={staffCount}/>
                    </div>
                    <div className="bg-teal-500 text-gray-900 rounded-lg shadow-md p-6">
                        <CountCard countCardType={"Available Equipment"} count={equCount}/>
                    </div>
                    <div className="bg-teal-500 text-gray-900 rounded-lg shadow-md p-6">
                        <CountCard countCardType={"Available Vehicles"} count={vehicleCount}/>
                    </div>
                </div>

                {/*Status Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
                    <div className="bg-gray-900 rounded-lg shadow-md p-6 max-h-80 overflow-y-auto">
                        <StatusCard statusCardType={"Employee Status"}>
                            <ul className="mt-4 space-y-2">
                                {/*<List listName={"Manager"} id={"Manager"} count={managerCount}/>*/}
                                <List listName={"Senior Assistant Managers"} id={"Senior-Assistant-Managers"} count={seniorAssistantCount}/>
                                <List listName={"Assistant Managers"} id={"Assistant-Managers"} count={assistantManagersCount}/>
                                <List listName={"Admin and HR Staff"} id={"Admin-and-HR-Staff"} count={adminHRCount}/>
                                <List listName={"Office Assistants"} id={"Office-Assistants"} count={officeAssistantsCount}/>
                                <List listName={"Senior Agronomists"} id={"Senior-Agronomists"} count={seniorAgronomistsCount}/>
                                <List listName={"Agronomists"} id={"Agronomists"} count={agronomistsCount}/>
                                <List listName={"Soil Scientists"} id={"Soil-Scientists"} count={soilScientistsCount}/>
                                <List listName={"Senior Technicians"} id={"Senior-Technicians"} count={seniorTechniciansCount}/>
                                <List listName={"Technicians"} id={"Technicians"} count={techniciansCount}/>
                                <List listName={"Supervisors"} id={"Supervisors"} count={supervisorsCount}/>
                                <List listName={"Labors"} id={"Labors"} count={laborsCount}/>
                            </ul>
                        </StatusCard>
                    </div>
                    <div className="bg-gray-900 rounded-lg shadow-md p-6 max-h-80 overflow-y-auto">
                        <StatusCard statusCardType={"Equipment Status"}>
                            <ul className="mt-4 space-y-2">
                                <List listName={"Hand Tools"} id={"HandTools"} count={handToolsCount}/>
                                <List listName={"Irrigation Equipment"} id={"Irrigation-Equipment"} count={IrrigationCount}/>
                                <List listName={"Power Tools and Machinery"} id={"Power-Tools-and-Machinery"} count={PowerCount}/>
                                <List listName={"Ploughing"} id={"Ploughing"} count={PloughingCount}/>
                                <List listName={"Weeding and Pest"} id={"Weeding-and-Pest"} count={WeedingCount}/>
                                <List listName={"Harvesting"} id={"Harvesting"} count={HarvestingCount}/>
                                <List listName={"Post-Harvest"} id={"Post-Harvest"} count={PostHarvestCount}/>
                                <List listName={"Monitoring and Measuring Tools"} id={"Monitoring-and-Measuring-Tools"} count={MonitoringCount}/>
                                <List listName={"Protective"} id={"Protective"} count={ProtectiveCount}/>
                            </ul>
                        </StatusCard>
                    </div>
                    <div className="bg-gray-900 rounded-lg shadow-md p-6 max-h-80 overflow-y-auto">
                        <StatusCard statusCardType={"Vehicle Status"}>
                            <ul className="mt-4 space-y-2">
                                <List listName={"Car"} id={"Car"} count={carCount}/>
                                <List listName={"Motor Bike"} id={"Motor-Bike"} count={bikeCount}/>
                                <List listName={"Van"} id={"Van"} count={vanCount}/>
                                <List listName={"Land Masters"} id={"Land-Masters"} count={landMasterCount}/>
                                <List listName={"Tractor–4WD"} id={"Tractor–4WD"} count={tractor4WDCount}/>
                                <List listName={"Tankers Truck"} id={"Tankers-Truck"} count={tankersCount}/>
                                <List listName={"Land Vehicles"} id={"Land-Vehicles"} count={landVehicleCount}/>
                                <List listName={"Lorry"} id={"Lorry"} count={lorryCount}/>
                            </ul>
                        </StatusCard>
                    </div>
                </div>
            </section>
        </>
    )
}
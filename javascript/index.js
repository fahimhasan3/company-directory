
let employeesData;
let allDepartments;
let allLocations;
let currentEditEmployee;
let currentEditDepartment;
let currentEditLocation;
let del_clicked = 0;
let del_department_clicked = 0;
let del_location_clicked = 0;

function filterByName() {
  let title = $('h1').text();
  if(title == 'Personnel') {
    getAllEmployees();
  } else if(title == 'Departments') {
    getFilteredDepartments();
  } else if(title == 'Locations') {
    getFilteredLocations();
  }
}

function getAllEmployees() {
  let nameFilter = $('#nameFilter').val();

  $.get("server/php/getAll.php", { name: nameFilter })
    .done(function (data) {
      console.log(data);
      if (data.status.code == 200) {
        employeesData = data.data;
        populateEmployeesTable();
      }
    });
}

function advancedSearchEmployees() {
  let department = $('select[id=advancedSearchDepartment] option').filter(':selected').val();
  let location = $('select[id=advancedSearchLocation] option').filter(':selected').val();
  let employeeName = $('#advancedSearchEmployeeName').val();

  $.get("server/php/getAll.php", { name: employeeName, department: department, location: location })
    .done(function (data) {
      console.log(data);
      if (data.status.code == 200) {
        employeesData = data.data;
        populateEmployeesTable();
      }
    });

  $('#advancedSearchModal').modal('hide');
}

function getAllDepartments() {
  $.get("server/php/getAllDepartments.php")
    .done(function (data) {
      console.log(data);
      if (data.status.code == 200) {
        allDepartments = data.data;
        populateDepartments();
        populateDepartmentsTable();
      }
    });
}

function getFilteredDepartments() {
  let nameFilter = $('#nameFilter').val();

  $.get("server/php/getAllDepartments.php", {name: nameFilter})
    .done(function (data) {
      console.log(data);
      if (data.status.code == 200) {
        allDepartments = data.data;
        populateDepartmentsTable();
      }
    });
}

function getAllLocations() {
  $.get("server/php/getAllLocations.php")
    .done(function (data) {
      console.log(data);
      if (data.status.code == 200) {
        allLocations = data.data;
        populateLocations();
        populateLocationsTable();
      }
    });
}

function getFilteredLocations() {
  let nameFilter = $('#nameFilter').val();

  $.get("server/php/getAllLocations.php", {name: nameFilter})
    .done(function (data) {
      console.log(data);
      if (data.status.code == 200) {
        allLocations = data.data;
        populateLocationsTable();
      }
    });
}

function populateDepartmentsTable() {
  $("#departmentsTable").empty();
  if (allDepartments != null) {
    for (index = 0; index < allDepartments.length; index++) {
      let departmentId = allDepartments[index].id;
      let name = allDepartments[index].name;
      let location = allDepartments[index].location;

      $('#departmentsTable').append(`
        <dl class="row col-xl-5 col-md-10 shadow" data-id=` + departmentId + ` onclick='openDepartmentModal();'>
          <div class='col-sm-10'>
              <div class='row'>
                <div class='col-sm-6'>
                  <dt class='col-sm-12'>Name</dt>
                  <dd class="col-sm-12">` + name + `</dd>
                </div>
                <div class='col-sm-6'>
                  <dt class='col-sm-12'>Location</dt>
                  <dd class="col-sm-12">` + location + `</dd>
                </div>
              </div>
           </div>
          <div class='col-sm-2'>
            <div class='row'>
              <br />
              <dd class="col-sm-12"><img src="images/delete.png" onclick='deleteDepartment();' alt='delete icon' data-id=` + departmentId + ` class='deleteImageSmall' /></dd>
            </div>
          </div>
      `);

    }
  }
}

function populateLocationsTable() {
  $("#locationsTable").empty();
  if (allLocations != null) {
    for (index = 0; index < allLocations.length; index++) {
      let locationId = allLocations[index].id;
      let name = allLocations[index].name;

      $('#locationsTable').append(`
        <dl class="row col-md-10 shadow" data-id=` + locationId + ` onclick='openLocationModal();'>
          <div class='col-sm-10'>
              <div class='row'>
                <dt class='col-sm-12'>Name</dt>
                <dd class="col-sm-12">` + name + `</dd>
              </div>
           </div>
          <div class='col-sm-2'>
            <div class='row'>
              <br />
              <dd class="col-sm-12"><img src="images/delete.png" onclick='deleteLocation();' alt='delete icon' data-id=` + locationId + ` class='deleteImageSmall' /></dd>
              <br />
            </div>
          </div>
      `);

    }
  }
}

function showDepartmentsTable() {
  $('#departmentSection').show();
  $('#employeeSection').hide();
  $('#locationSection').hide();

  $('#advancedSearchButton').hide();
  $('#resetFiltersButton').hide();

  $('#manageDepartmentsButton').addClass('active');
  $('#managePersonnelButton').removeClass('active');
  $('#manageLocationsButton').removeClass('active');

  $('#addDepartmentButton').show();
  $('#addEmployeeButton').hide();
  $('#addLocationButton').hide();

  $('h1').text('Departments');

  $('#searchBarDiv').css('width', '76%');
}

function showLocationTable() {
  $('#locationSection').show();
  $('#departmentSection').hide();
  $('#employeeSection').hide();

  $('#advancedSearchButton').hide();
  $('#resetFiltersButton').hide();

  $('#manageLocationsButton').addClass('active');
  $('#manageDepartmentsButton').removeClass('active');
  $('#managePersonnelButton').removeClass('active');

  $('#addLocationButton').show();
  $('#addDepartmentButton').hide();
  $('#addEmployeeButton').hide();

  $('h1').text('Locations');

  $('#searchBarDiv').css('width', '56%');
}

function populateDepartments() {
  let editEmployeeDepartment = $('#editEmployeeDepartment');
  let newEmployeeDepartment = $('#newEmployeeDepartment');
  let advancedSearchDepartment = $('#advancedSearchDepartment');
  if (allDepartments != null) {
    editEmployeeDepartment.empty();
    newEmployeeDepartment.empty();
    advancedSearchDepartment.empty();

    newEmployeeDepartment.append("<option disabled selected value='null'> -- select an option -- </option>");
    advancedSearchDepartment.append("<option selected value=''> -- All Departments -- </option>");

    for (index = 0; index < allDepartments.length; index++) {
      let id = allDepartments[index].id;
      let name = allDepartments[index].name;
      let option = "<option value=" + id + ">" + name + "</option";
      editEmployeeDepartment.append(option);
      newEmployeeDepartment.append(option);
      advancedSearchDepartment.append(option);
    }
  }

}

function populateLocations() {
  let editDepartmentLocation = $('#editDepartmentLocation');
  let newDepartmentLocation = $('#newDepartmentLocation');
  let advancedSearchLocation = $('#advancedSearchLocation');

  if (allLocations != null) {
    editDepartmentLocation.empty();
    newDepartmentLocation.empty();

    newDepartmentLocation.append("<option disabled selected value='null'> -- select an option -- </option>");
    advancedSearchLocation.append("<option selected value=''> -- All Locations -- </option>");

    for (index = 0; index < allLocations.length; index++) {
      let id = allLocations[index].id;
      let name = allLocations[index].name;
      let option = "<option value=" + id + ">" + name + "</option";
      editDepartmentLocation.append(option);
      newDepartmentLocation.append(option);
      advancedSearchLocation.append(option);
    }
  }
}

function showPersonnelTable() {
  $('#departmentSection').hide();
  $('#employeeSection').show();
  $('#locationSection').hide();

  $('#advancedSearchButton').show();
  $('#resetFiltersButton').show();

  $('#managePersonnelButton').addClass('active');
  $('#manageDepartmentsButton').removeClass('active');
  $('#manageLocationsButton').removeClass('active');

  $('#addDepartmentButton').hide();
  $('#addEmployeeButton').show();
  $('#addLocationButton').hide();

  $('h1').text('Personnel');

  $('#searchBarDiv').css('width', '95%');
}

function populateEmployeesTable() {
  
  $("#employeesTable").empty();

  if (employeesData != null) {
    for (index = 0; index < employeesData.length; index++) {
      let employeeId = employeesData[index].id;
      let lastName = employeesData[index].lastName;
      let firstName = employeesData[index].firstName;
      let jobTitle = employeesData[index].jobTitle != null ? employeesData[index].jobTitle : "";
      let email = employeesData[index].email != null ? employeesData[index].email : "";
      let phoneNumber = employeesData[index].phoneNumber != null ? employeesData[index].phoneNumber : "";
      let department = employeesData[index].department;

      
      
      $('#employeesTable').append(`
        <dl class="row col-xl-5 col-lg-10 shadow" data-id=` + employeeId + ` onclick='openEmployeeModal();'>
          <div class='col-sm-10'>
              <div class='row'>
                <div class='col-sm-6'>
                  <dt class='col-sm-12'>Name</dt>
                  <dd class="col-sm-12">` + lastName + ` ` + firstName + `</dd>
                  <dt class='col-sm-12'>Job Title</dt>
                  <dd class="col-sm-12">` + jobTitle + `</dd>
                  <dt class='col-sm-12'>Department</dt>
                  <dd class="col-sm-12">` + department + `</dd>
                </div>
                <div class='col-sm-6'>
                  <dt class='col-sm-12'>Phone Number</dt>
                  <dd class="col-sm-12">` + phoneNumber + `</dd>
                  <dt class='col-sm-12'>Email</dt>
                  <dd class="col-sm-12">` + email + `</dd>
                </div>
              </div>
           </div>
          <div class='col-sm-2'>
            <div class='row'>
              <br />
              <dd class="col-sm-12"><img src="images/delete.png" onclick='deleteEmployee();' alt='delete icon' data-id=` + employeeId + ` class='deleteImageSmall' /></dd>
              <br />
            </div>
          </div>
      `);
    }
  }

}

function validateNewEmployee() {
  let lastName = $('#newEmployeeLastName').val() != "" ? $('#newEmployeeLastName').val() : null;
  let firstName = $('#newEmployeeFirstName').val() != "" ? $('#newEmployeeFirstName').val() : null;
  let department = $('#newEmployeeDepartment').val() != "" ? $('#newEmployeeDepartment').val() : null;



  if (lastName != null && firstName != null && department != null) {
    insertNewEmployee();
  } else {
    //display errors on modal
    if (lastName == null) {
      $('#newEmployeeLastName').addClass('is-invalid');
    } else {
      $('#newEmployeeLastName').removeClass('is-invalid');
    }
    if (firstName == null) {
      $('#newEmployeeFirstName').addClass('is-invalid');
    } else {
      $('#newEmployeeFirstName').removeClass('is-invalid');
    }
    if (department == null) {
      $('#newEmployeeDepartment').addClass('is-invalid');
    } else {
      $('#newEmployeeDepartment').removeClass('is-invalid');
    }
  }
}

function insertNewEmployee() {
  let lastName = $('#newEmployeeLastName').val();
  let firstName = $('#newEmployeeFirstName').val();
  let jobTitle = $('#newEmployeeJobTitle').val();
  let department = $('#newEmployeeDepartment').val();
  let phoneNumber = $('#newEmployeePhoneNumber').val();
  let email = $('#newEmployeeEmail').val();


  $.post("server/php/insertPersonnel.php", { lastName: lastName, firstName: firstName, jobTitle: jobTitle, phoneNumber: phoneNumber, email: email, departmentID: department })
    .done(function (data) {
      console.log(data);
      if (data.status.code == 200) {
        console.log('Employee inserted correctly')
      } else {
        console.error(data.status.description);
        getAllEmployees();
      }
    });
  $('#insertEmployeeModal').modal('hide');
}

function validateNewDepartment() {
  let name = $('#newDepartmentName').val();
  let locationID = $('#newDepartmentLocation').val();

  if(name != "" && locationID != null) {
    insertNewDepartment();
  } else {
    if(name == "") {
      $('#newDepartmentName').addClass('is-invalid');
    } else {
      $('#newDepartmentName').removeClass('is-invalid');
    }
    if(locationID == null) {
      $('#newDepartmentLocation').addClass('is-invalid');
    } else {
      $('#newDepartmentLocation').removeClass('is-invalid');
    }
  }
}

function insertNewDepartment() {
  let name = $('#newDepartmentName').val();
  let locationID = $('#newDepartmentLocation').val();

  $.post("server/php/insertDepartment.php", { name: name, locationID: locationID })
    .done(function (data) {
      console.log(data);
      if (data.status.code == 200) {
        console.log('Department inserted correctly');
        getAllDepartments();
      } else {
        console.error(data.status.description);
      }
    });
  $('#insertDepartmentModal').modal('hide');
}

function validateNewLocation() {
  let name = $('#newLocationName').val();

  if(name != '') {
    insertNewLocation();
  } else {
    $('#newLocationName').addClass('is-invalid');
  }
}

function insertNewLocation() {
  let name = $('#newLocationName').val();

  $.post("server/php/insertLocation.php", { name: name })
    .done(function (data) {
      console.log(data);
      if (data.status.code == 200) {
        console.log('Location inserted correctly');
        getAllLocations();
      } else {
        console.error(data.status.description);
      }
    });
  
  $('#insertLocationModal').modal('hide');
}


function populateEditEmployeeModal(e) {
  let idFromRow = $(event.target).closest('dl').data('id');
  let employee;
  for (let i = 0; i < employeesData.length; i++) {
    if (employeesData[i].id == idFromRow) {
      employee = employeesData[i];
      currentEditEmployee = employee;
      break;
    }
  }
  $('#editEmployeeLastName').val(employee.lastName);
  $('#editEmployeeFirstName').val(employee.firstName);
  $('#editEmployeeJobTitle').val(employee.jobTitle);
  $('#editEmployeePhoneNumber').val(employee.phoneNumber);
  $('#editEmployeeEmail').val(employee.email);

  for (let i = 0; i < allDepartments.length; i++) {
    let id = allDepartments[i].id;
    let name = allDepartments[i].name;
    if (name == employee.department) {
      $('#editEmployeeDepartment').val(allDepartments[i].id);
      break;
    }
  }
}

function clearEditEmployeeModal() {
  $('#editEmployeeLastName').removeClass('is-invalid');
  $('#editEmployeeFirstName').removeClass('is-invalid');
  $('#editEmployeeDepartment').removeClass('is-invalid');
}

function validateEditEmployee() {
  let lastName = $('#editEmployeeLastName').val();
  let firstName = $('#editEmployeeFirstName').val();

  if(lastName != "" && firstName != "" ) {
    editEmployee();
  } else {
    if(lastName == "") {
      $('#editEmployeeLastName').addClass('is-invalid');
    } else {
      $('#editEmployeeLastName').removeClass('is-invalid');
    }
    if(firstName == "") {
      $('#editEmployeeFirstName').addClass('is-invalid');
    } else {
      $('#editEmployeeFirstName').removeClass('is-invalid');
    }
  }
}

function editEmployee() {
  let lastName = $('#editEmployeeLastName').val();
  let firstName = $('#editEmployeeFirstName').val();
  let jobTitle = $('#editEmployeeJobTitle').val();
  let department = $('#editEmployeeDepartment').val();
  let phoneNumber = $('#editEmployeePhoneNumber').val();
  let email = $('#editEmployeeEmail').val();
  let id = currentEditEmployee.id;

  $.post("server/php/updatePersonnel.php", { lastName: lastName, firstName: firstName, jobTitle: jobTitle, phoneNumber: phoneNumber, email: email, departmentID: department, id: id })
    .done(function (data) {
      console.log(data);
      if (data.status.code == 200) {
        console.log('Employee updated correctly');
        getAllEmployees();
      } else {
        console.error(data.status.description);
      }
    });
  $('#editEmployeeModal').modal('hide');

}

function validateEditDepartment() {
  let name = $('#editDepartmentName').val();
  let id = currentEditDepartment.id;

  if(name != "") {
    editDepartment();
  } else {
    if(name == "") {
      $('#editDepartmentName').addClass('is-invalid');
    } else {
      $('#editDepartmentName').removeClass('is-invalid');
    }
  }
}

function editDepartment() {
  let name = $('#editDepartmentName').val();
  let location = $('#editDepartmentLocation').val();
  let id = currentEditDepartment.id;

  $.post("server/php/updateDepartment.php", { name: name, locationID: location, id: id })
    .done(function (data) {
      console.log(data);
      if (data.status.code == 200) {
        console.log('Department updated correctly');
        getAllDepartments();
      } else {
        console.error(data.status.description);
      }
    });
  
  $('#editDepartmentModal').modal('hide');
}

function validateEditLocation() {
  let name = $('#editLocationName').val();
  if(name != "") {
    editLocation()
  } else {
    $('#editLocationName').addClass('is-invalid');
  }
}

function editLocation() {
  let name = $('#editLocationName').val();
  let id = currentEditLocation.id;

  $.post("server/php/updateLocation.php", { name: name, id: id })
    .done(function (data) {
      console.log(data);
      if (data.status.code == 200) {
        console.log('Location updated correctly');
        getAllLocations();
      } else {
        console.error(data.status.description);
      }
    });
  
  $('#editLocationModal').modal('hide');
}

function deleteEmployeeFromModal() {
  let id = currentEditEmployee.id;

  $.post("server/php/deletePersonnelByID.php", { id: id })
    .done(function (data) {
      console.log(data);
      if (data.status.code == 200) {
        console.log('Employee deleted correctly');
        getAllEmployees();
      } else {
        console.error(data.status.description);
      }
    });
  $('#editEmployeeModal').modal('hide');
  $('#deleteEmployeeModal').modal('hide');

}

function openEmployeeModal() {
  if (del_clicked == 0)
    $("#editEmployeeModal").modal("show");
}

function deleteEmployee(e) {
  del_clicked = 1;

  let idFromRow = $(event.target).closest('dl').data('id');
  let employee;
  for (let i = 0; i < employeesData.length; i++) {
    if (employeesData[i].id == idFromRow) {
      employee = employeesData[i];
      currentEditEmployee = employee;
      break;
    }
  }
  $("#deleteEmployeeModal").modal('show');
}

function deleteDepartmentFromModal() {
  let id = currentEditDepartment.id;

  $.post("server/php/deleteDepartmentByID.php", { id: id })
    .done(function (data) {
      console.log(data);
      if (data.status.code == 200) {
        console.log('Department deleted correctly');
        getAllDepartments();
      } else {
        console.error(data.status.description);
      }
    });
  
  $('#editDepartmentModal').modal('hide');
  $('#deleteDepartmentModal').modal('hide');
}

function deleteLocationFromModal() {
  let id = currentEditLocation.id;

  $.post("server/php/deleteLocationByID.php", { id: id })
    .done(function (data) {
      console.log(data);
      if (data.status.code == 200) {
        console.log('Location deleted correctly');
        getAllLocations();
      } else {
        console.error(data.status.description);
      }
    });
  
  $('#editLocationModal').modal('hide');
  $('#deleteLocationModal').modal('hide');
}

function openDepartmentModal() {
  if (del_department_clicked == 0)
    $("#editDepartmentModal").modal("show");
}

function openLocationModal() {
  if(del_location_clicked == 0)
    $("#editLocationModal").modal("show");
}

function deleteDepartment(e) {
  del_department_clicked = 1;

  let idFromRow = $(event.target).closest('dl').data('id');
  let department;
  for (let i = 0; i < allDepartments.length; i++) {
    if (allDepartments[i].id == idFromRow) {
      department = allDepartments[i];
      currentEditDepartment = department;
      break;
    }
  }
  $("#deleteDepartmentModal").modal('show');
}

function deleteLocation(e) {
  del_location_clicked = 1;

  let idFromRow = $(event.target).closest('dl').data('id');
  let location;
  for (let i = 0; i < allLocations.length; i++) {
    if (allLocations[i].id == idFromRow) {
      location = allLocations[i];
      currentEditLocation = location;
      break;
    }
  }
  $("#deleteLocationModal").modal('show');
}

function populateEditDepartmentModal(e) {
  let idFromRow = $(event.target).closest('dl').data('id');
  let department;
  for (let i = 0; i < allDepartments.length; i++) {
    if (allDepartments[i].id == idFromRow) {
      department = allDepartments[i];
      currentEditDepartment = department;
      break;
    }
  }
  $('#editDepartmentName').val(department.name);

  for (let i = 0; i < allLocations.length; i++) {
    let id = allLocations[i].id;
    let name = allLocations[i].name;
    if (name == department.location) {
      $('#editDepartmentLocation').val(allLocations[i].id);
      break;
    }
  }
}

function clearEditDepartmentModal() {
  $('#editDepartmentName').removeClass('is-invalid');
  $('#editDepartmentLocation').removeClass('is-invalid');
}

function populateEditLocationModal(e) {
  let idFromRow = $(event.target).closest('dl').data('id');
  let location;
  for (let i = 0; i < allLocations.length; i++) {
    if (allLocations[i].id == idFromRow) {
      location = allLocations[i];
      currentEditLocation = location;
      break;
    }
  }
  $('#editLocationName').val(location.name);
}

function clearEditLocationModal() {
  $('#editLocationName').removeClass('is-invalid');
}

function populateDeleteEmployeeModal() {
  $('#deleteEmployeeModal .modal-body').text('Are you sure you want to delete ' + currentEditEmployee.firstName + ' ' + currentEditEmployee.lastName + ' ?');
}

function populateDeleteDepartmentModal() {
  $('#deleteDepartmentModal .modal-body').text('Are you sure you want to delete ' + currentEditDepartment.name + ' ?');
}

function populateDeleteLocationModal() {
  $('#deleteLocationModal .modal-body').text('Are you sure you want to delete ' + currentEditLocation.name + ' ?');
}

function clearAddNewEmployeeModal() {
  $('#newEmployeeLastName').val("");
  $('#newEmployeeFirstName').val("");
  $('#newEmployeeJobTitle').val("");
  $('#newEmployeeDepartment').val(null);
  $('#newEmployeePhoneNumber').val("");
  $('#newEmployeeEmail').val("");

  $('#newEmployeeLastName').removeClass('is-invalid');
  $('#newEmployeeFirstName').removeClass('is-invalid');
  $('#newEmployeeDepartment').removeClass('is-invalid');

}

function clearAddNewDepartmentModal() {
  $('#newDepartmentName').val('');
  $('#newDepartmentLocation').val(null);

  $('#newDepartmentName').removeClass('is-invalid');
  $('#newDepartmentLocation').removeClass('is-invalid');
}

function clearAddNewLocationModal() {
  $('#newLocationName').val('');
  $('#newLocationName').removeClass('is-invalid');
}

function resetFilters() {

  $('#nameFilter').val('');
  $('#advancedSearchDepartment').val('');
  $('#advancedSearchLocation').val('');
  $('#advancedSearchEmployeeName').val('');

  getAllEmployees();
}

$(document).ready(function () {
  getAllEmployees();
  getAllDepartments();
  getAllLocations();

  $('#departmentSection').hide();
  $('#locationSection').hide();
  $('#advancedSearchModal').hide();
  $('#addDepartmentButton').hide();
  $('#addLocationButton').hide();

  $('#nameFilter').keyup(filterByName);
  $('#advancedSearchSubmit').click(advancedSearchEmployees);
  $('#resetFiltersButton').click(resetFilters);  
  
  //NAV
  $('#managePersonnelButton').addClass('active');
  $('#manageDepartmentsButton').click(showDepartmentsTable);
  $('#managePersonnelButton').click(showPersonnelTable);
  $('#manageLocationsButton').click(showLocationTable);

  //PERSONNEL
  $('#editEmployeeModal').on('shown.bs.modal', populateEditEmployeeModal);
  $('#editEmployeeModal').on('hidden.bs.modal', clearEditEmployeeModal);
  $('#deleteEmployeeModal').on('shown.bs.modal', populateDeleteEmployeeModal);
  $('#deleteEmployeeModal').on('hidden.bs.modal', function () {
    del_clicked = 0;
  });
  $('#insertEmployeeModal').on('hidden.bs.modal', clearAddNewEmployeeModal);
  $('#editEmployeeSubmit').click(validateEditEmployee);
  $('#addNewEmployeeSubmit').click(validateNewEmployee);
  $('#deleteEmployeeButton').click(deleteEmployeeFromModal);

  //DEPARTMENT
  $('#deleteDepartmentModal').on('shown.bs.modal', populateDeleteDepartmentModal);
  $('#deleteDepartmentModal').on('hidden.bs.modal', function () {
    del_department_clicked = 0;
  });
  $('#insertDepartmentModal').on('hidden.bs.modal', clearAddNewDepartmentModal);
 
  $('#addNewDepartmentSubmit').click(validateNewDepartment);
  $('#editDepartmentModal').on('shown.bs.modal', populateEditDepartmentModal);
  $('#editDepartmentModal').on('shown.bs.modal', clearEditDepartmentModal);
  $('#editDepartmentSubmit').click(validateEditDepartment);
  $('#deleteDepartmentButton').click(deleteDepartmentFromModal);


  //LOCATION
  $('#deleteLocationModal').on('shown.bs.modal', populateDeleteLocationModal);
  $('#deleteLocationModal').on('hidden.bs.modal', function () {
    del_location_clicked = 0;
  });
  $('#insertLocationModal').on('hidden.bs.modal', clearAddNewLocationModal);
  $('#addNewLocationSubmit').click(validateNewLocation);
  $('#editLocationModal').on('shown.bs.modal', populateEditLocationModal);
  $('#editLocationModal').on('hidden.bs.modal', clearEditLocationModal);
  $('#editLocationSubmit').click(validateEditLocation);
  $('#deleteLocationButton').click(deleteLocationFromModal);
  
});
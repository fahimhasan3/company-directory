<!DOCTYPE html>
<html>

<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Company Directory</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>

    <script src="javascript/jquery-3.5.1.min.js"></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.2/jquery.validate.min.js'></script>

    <link rel="stylesheet" type="text/css" href="css/normalize.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>

    <script src="javascript/index.js"></script>
    <link rel="stylesheet" type="text/css" href="css/index.css">
    <link rel="icon" type="image/png" href="favicon.jfif">
</head>

<body>
    <nav>
        <ul>
            <div id='NavTitle'>Company Directory</div>
            <li id='managePersonnelButton'>Personnel</li>
            <li id='manageDepartmentsButton'>Departments</li>
            <li id='manageLocationsButton'>Locations</li>
        </ul>
    </nav>


    <section id='searchParametersSection'>
        <div class="modal" tabindex="-1" role="dialog" id='advancedSearchModal'>
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header bg-success">
                        <h5 class="modal-title">Advanced Search</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span class='modalCloseButton' aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <label>Name</label>
                        <input type='text' id='advancedSearchEmployeeName' class='form-control' />
                        <label>Department</label>
                        <select id='advancedSearchDepartment' class='form-control'>
                        </select>
                        <label>Location</label>
                        <select id='advancedSearchLocation' class='form-control'></select>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary modalButton" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-success modalButton" id='advancedSearchSubmit'>Search</button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <h1>Personnel</h1>
    <div class='row'>
        <div class='col-2'>
            <img src='images/search-icon.png' alt='search icon' id='searchIcon' />
            <input type='text' id='nameFilter' placeholder="Name" class='form-control' />
        </div>
        <div class='col-2'>
            <button type="button" class="btn btn-secondary" id='resetFiltersButton'>
                Reset Filters
            </button>
            <button type="button" class="btn btn-success" data-toggle="modal" data-target="#advancedSearchModal" id='advancedSearchButton'>
                Advanced Search
            </button>
        </div>
    </div>


    <section id='employeeSection'>
        <div id='employeesTableWrapper' class='tableWrapper'>
            <table id='employeesTable' class='table table-borderless shadow table-hover'>
                <thead>
                    <tr>
                        <th class="th-sm">Last Name
                        </th>
                        <th class="th-sm">First Name
                        </th>
                        <th class="th-sm">Job Title
                        </th>
                        <th class="th-sm">Email
                        </th>
                        <th class="th-sm">Phone Number
                        </th>
                        <th class="th-sm">Department
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>

        <div class="modal" tabindex="-1" role="dialog" id='editEmployeeModal'>
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header bg-primary">
                        <h4 class="modal-title">Edit Employee</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span class='closeModalButton' aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <label>Last Name</label>
                        <input type='text' id='editEmployeeLastName' required class='form-control' />
                        <label>First Name</label>
                        <input type='text' id='editEmployeeFirstName' required class='form-control' />
                        <label>Job Title</label>
                        <input type='text' id='editEmployeeJobTitle' class='form-control' />

                        <label>Department</label>
                        <select id="editEmployeeDepartment" class='form-control'>
                        </select>

                        <label>Phone Number</label>
                        <input type='text' id='editEmployeePhoneNumber' class='form-control' />
                        <label>Email</label>
                        <input type='email' id='editEmployeeEmail' class='form-control' />


                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary modalButton" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary modalButton" id='editEmployeeSubmit'>Save</button>
                        <button type="button" class="btn btn-danger modalButton" data-toggle="modal" data-target="#deleteEmployeeModal">Delete</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal" tabindex="-1" role="dialog" id='deleteEmployeeModal'>
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header bg-danger">
                        <h4 class="modal-title">Delete Employee</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span class='modalCloseButton' aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to delete this employee?
                    </div><br />
                    <br />
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary modalButton" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-danger modalButton" id='deleteEmployeeButton'>Delete</button>
                    </div>
                </div>
            </div>
        </div>

        <button type="button" class="btn btn-primary modalButton float-right" data-toggle="modal" data-target="#insertEmployeeModal" id='addEmployeeButton'>+ Add Employee</button>
        <div class="modal" tabindex="-1" role="dialog" id='insertEmployeeModal'>
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header bg-primary">
                        <h4 class="modal-title">Insert Employee</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span class='modalCloseButton' aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <label>Last Name<span style='font-weight: normal;'> (required)</span></label>
                        <input type='text' id='newEmployeeLastName' class='form-control' />
                        <div class="invalid-feedback">
                            Please insert a last name.
                        </div>
                        <label>First Name<span style='font-weight: normal;'> (required)</span></label>
                        <input type='text' id='newEmployeeFirstName' class='form-control' />
                        <div class="invalid-feedback">
                            Please insert a first name.
                        </div>
                        <label>Job Title</label>
                        <input type='text' id='newEmployeeJobTitle' class='form-control' />
                        <label>Department<span style='font-weight: normal;'> (required)</span></label>
                        <select id='newEmployeeDepartment' class='form-control'>
                        </select>
                        <div class="invalid-feedback">
                            Please choose a department.
                        </div>

                        <label>Phone Number</label>
                        <input type='text' id='newEmployeePhoneNumber' class='form-control' />
                        <label>Email</label>
                        <input type='email' id='newEmployeeEmail' class='form-control' />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary modalButton" data-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-primary modalButton" id='addNewEmployeeSubmit'>Insert</button>
                    </div>
                </div>
            </div>
        </div>
    </section>


    <section id='departmentSection'>
        <div class='tableWrapper'>
            <table id='departmentsTable' class='table table-borderless shadow table-hover'>
                <thead>
                    <tr>
                        <th class="th-sm">Name
                        </th>
                        <th class="th-sm">Location
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>


        <div class="modal" tabindex="-1" role="dialog" id='editDepartmentModal'>
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header bg-primary">
                        <h4 class="modal-title">Edit Department</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span class='modalCloseButton' aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <label>Name</label>
                        <input type='text' id='editDepartmentName' class='form-control' required />

                        <label>Location</label>
                        <select id='editDepartmentLocation' class='form-control'>
                        </select>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary modalButton" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary modalButton" id='editDepartmentSubmit'>Save</button>
                        <button type="button" class="btn btn-danger modalButton" data-toggle="modal" data-target="#deleteDepartmentModal">Delete</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal" tabindex="-1" role="dialog" id='deleteDepartmentModal'>
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header bg-danger">
                        <h4 class="modal-title">Delete Department</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span class='modalCloseButton' aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to delete this department?
                    </div><br />
                    <br />
                    <div class="modal-footer">
                        <div class="col-sm text-center"> <button type="button" class="btn btn-secondary modalButton" data-dismiss="modal">Cancel</button></div>
                        <div class="col-sm text-center"><button type="button" class="btn btn-danger modalButton" id='deleteDepartmentButton'>Delete</button></div>
                    </div>
                </div>
            </div>
        </div>

        <button type="button" class="btn btn-primary modalButton float-right" data-toggle="modal" data-target="#insertDepartmentModal" id='addDepartmentButton'>+ Add Department</button>
        <div class="modal" tabindex="-1" role="dialog" id='insertDepartmentModal'>
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header bg-primary">
                        <h4 class="modal-title">Insert Department</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span class='modalCloseButton' aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <label>Name</label>
                        <input type='text' id='newDepartmentName' class='form-control' />

                        <label>Location</label>
                        <select id='newDepartmentLocation' class='form-control'>
                        </select>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary modalButton" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary modalButton" id='addNewDepartmentSubmit'>Insert</button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id='locationSection'>
        <div class='tableWrapper'>
            <table id='locationsTable' class='table table-borderless shadow table-hover'>
                <thead>
                    <tr>
                        <th class="th-sm">Name
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>

        <div class="modal" tabindex="-1" role="dialog" id='editLocationModal'>
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header bg-primary">
                        <h4 class="modal-title">Edit Location</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span class='modalCloseButton' aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <label>Name</label>
                        <input type='text' id='editLocationName' class='form-control' />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary modalButton" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary modalButton" id='editDepartmentSubmit'>Save</button>
                        <button type="button" class="btn btn-danger modalButton" data-toggle="modal" data-target="#deleteLocationModal">Delete</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal" tabindex="-1" role="dialog" id='deleteLocationModal'>
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header bg-danger">
                        <h4 class="modal-title">Delete Location</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span class='modalCloseButton' aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to delete this location?
                    </div><br />
                    <br />
                    <div class="modal-footer">
                        <div class="col-sm text-center"> <button type="button" class="btn btn-secondary modalButton" data-dismiss="modal">Cancel</button></div>
                        <div class="col-sm text-center"><button type="button" class="btn btn-danger modalButton" id='deleteLocationButton'>Delete</button></div>
                    </div>
                </div>
            </div>
        </div>

        <button type="button" class="btn btn-primary modalButton float-right" data-toggle="modal" data-target="#insertLocationModal" id='addLocationButton'>+ Add Location</button>
        <div class="modal" tabindex="-1" role="dialog" id='insertLocationModal'>
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header bg-primary">
                        <h4 class="modal-title">Insert Location</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span class='modalCloseButton' aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <label>Name</label>
                        <input type='text' id='newLocationName' class='form-control' />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary modalButton" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary modalButton" id='addNewLocationSubmit'>Insert</button>
                    </div>
                </div>
            </div>
        </div>
    </section>




</body>

</html>
# robotic_simulation
Author: Andre Dreitz \
Video: VC \
Description: An application written in Rust and Typescript supporting the creation of 2D or 3D objects and controlling their movements based on coordinate transformations.

## Important settings
If you want to run a build version you have to manually change the path of the dir for the settings file.

## Used Frameworks
Angular v19
Tauri v2

# angular
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Partiall Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Tauri

## Full Build

Run `npm run tauri build` to build the full Project. The build artifacts will be stored in the `target/` directory.

## Running unit tests

Run `.cargo\bin\cargo.exe test --package robotic_simulation --lib -- tests --show-output` to execute the unit tests.

## Developer mode

Run `npm run tauri dev` for a development view.


# File describtion for Rust

## main
start of project

## for every mod file
describes which methods are callable from other files

## lib
manages endpoints, tauri functions and test cases

## algorithms/euler
defines possible mathematical equations for euler angles

### possible funcs
from_rotation_matrix \
to_rotation_matrix

## algorithms/matrix
defines possible mathematical equations for matrices

### possible funcs
sum_of \
product_of \
transpose \
invert_4x4

## algorithms/quaternion
defines possible mathematical equations for quaternions

### possible funcs
new \
sum_of \
product_of \
to_rotation_matrix \
slerp

## algorithms/vector
defines possible mathematical equations for vectors

### possible funcs
sum_of \
scalar_product_of \
cross_product_of

## files/manage_projects
allows the project to write and read from and to a dir for every project/object 

### possible funcs
save \
load \
list_projects

## files/manage_settings
allows the project to write and read from and to the settings dir

### possible funcs
save \
load

# File describtion for Angular
For styling purposes tailwind and primeng were used and some own written code.

## core
Defines a folder containing all the files/services that call a endpoint or/and are caching input, projects and so on. \
Allows the files in the project to communicate.

## shared
Is the main logic of the frontend controlling when a service is called and some more logic like controlling a frontend div. \
Every folder contains a styling sheet, test file, html file and a logic file. \
The logic is written in Typescript. 

## app component
Is display every route and the standard parts that should always be displayed.

## app config
Defines settings for the frontend like the preset for primeng.

## app routes
Defines different routes the project can display. 

# User docs

## How to use
The settings cog wheel is used to configure you style and the save dir for your projects. \
Set it before first creation otherwise it may point to nothing or a dir you have and don't want to write to. \
\
You can create a project via clicking on new under home or clicking on project and then create. \
Select a project under the tab home and click open. \
To change a project click project and then change. \


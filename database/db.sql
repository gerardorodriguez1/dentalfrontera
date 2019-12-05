create database dentalfrontera;

use dentalfrontera;


-- TABLA USUARIOS CONSULTORIO
create table usuarios(
	id int(11) not null,
    username varchar(20) not null,
    password varchar(60) not null,
    correo varchar(50) not null 
);

alter table usuarios
	add primary key (id);
    

alter table usuarios
	MODIFY id int(11) not null auto_increment, auto_increment = 2;
    
describe usuarios;

SELECT * FROM usuarios;

-- TABLA DE PACIENTES QUE PIDEN CITA POR SITIO WEB
create table pacientes_citas(
	id_p int(11) not null,
    nombre varchar (50) not null,             
    direccion varchar(50) not null,
    telefono char(10) not null,
    descripcion varchar(99) not null,
    extra varchar(50) not null


    
);

alter table pacientes_citas
	add primary key (id_p);

alter table pacientes_citas
	modify id_p int(11) not null auto_increment, auto_increment = 2;


describe pacientes_citas;

-- TABLA DE CITAS PROGRAMADAS
create table citas(
	id_cita int(11) not null,
    descripcion_cita varchar(99) not null,
    id_p int(11),
	
    foreign key (id_p) REFERENCES pacientes_citas(id_p)
    
);
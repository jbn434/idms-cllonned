"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceModule = void 0;
const common_1 = require("@nestjs/common");
const device_service_1 = require("./device.service");
const device_controller_1 = require("./device.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../entities/user.entity");
const device_entity_1 = require("../../entities/device.entity");
const node_entity_1 = require("../../entities/node.entity");
const users_module_1 = require("../users/users.module");
const audit_trail_entity_1 = require("../../entities/audit-trail.entity");
let DeviceModule = class DeviceModule {
};
exports.DeviceModule = DeviceModule;
exports.DeviceModule = DeviceModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([device_entity_1.Device, node_entity_1.Node, user_entity_1.User, audit_trail_entity_1.AuditTrail]), users_module_1.UsersModule],
        controllers: [device_controller_1.DeviceController],
        providers: [device_service_1.DeviceService],
        exports: [device_service_1.DeviceService],
    })
], DeviceModule);
//# sourceMappingURL=device.module.js.map
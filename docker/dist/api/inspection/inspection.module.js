"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InspectionModule = void 0;
const common_1 = require("@nestjs/common");
const inspection_service_1 = require("./inspection.service");
const inspection_controller_1 = require("./inspection.controller");
const typeorm_1 = require("@nestjs/typeorm");
const inspection_entity_1 = require("../../entities/inspection.entity");
const audit_trail_entity_1 = require("../../entities/audit-trail.entity");
const inspection_question_entity_1 = require("../../entities/inspection-question.entity");
let InspectionModule = class InspectionModule {
};
exports.InspectionModule = InspectionModule;
exports.InspectionModule = InspectionModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([inspection_entity_1.Inspection, audit_trail_entity_1.AuditTrail, inspection_question_entity_1.InspectionQuestion])],
        controllers: [inspection_controller_1.InspectionController],
        providers: [inspection_service_1.InspectionService],
        exports: [inspection_service_1.InspectionService],
    })
], InspectionModule);
//# sourceMappingURL=inspection.module.js.map
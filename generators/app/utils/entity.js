const plural = require('plural');
const tools = require('./tools');
module.exports = {
  getTemplateParams(entityJson) {
    let entityFolderName = entityJson.name.replace(/([A-Z])/g,"-$1").toLowerCase();
    if (entityFolderName[0] === '-') {
      entityFolderName = entityFolderName.substr(1)
    }
    const entityModel = {
        ...entityJson
      };
      // 当前表中所有字段所有使用到的字段类型，不是 sql 类型，而是 JDL 类型
      const fieldTypeList = [];
      // 是否存在 ID 关键字段
      let existsId = false;
      entityModel.fields.forEach(item => {
        if (item.fieldName === 'id') {
          existsId = true;
        }
        let  existsType = false;
        for (let i = 0; i < fieldTypeList.length; i++) {
          if (fieldTypeList[i] === item.fieldType) {
            existsType = true;
            break;
          }
        }
        if (!existsType) {
          fieldTypeList.push(item.fieldType);
        }
        // 把 JDL 类型转为 js 和 sql 类型
        switch (item.fieldType) {
          case 'Long':
            item.jsFieldType = 'number';
            item.sqlFieldType = 'bigint';
            break;
          case 'Integer':
            item.jsFieldType = 'number';
            item.sqlFieldType = 'integer';
            break;
          case 'BigDecimal':
            item.jsFieldType = 'number';
            item.sqlFieldType = 'decimal';
            break;
          case 'Float':
            item.jsFieldType = 'number';
            item.sqlFieldType = 'float';
            break;
          case 'Double':
            item.jsFieldType = 'number';
            item.sqlFieldType = 'double';
            break;
          case 'String':
            item.jsFieldType = 'string';
            item.sqlFieldType = 'varchar';
            break;
          case 'byte[]':
            item.jsFieldType = 'string';
            item.sqlFieldType = item.fieldTypeBlobContent;
            break;
          case 'Boolean':
            item.jsFieldType = 'boolean';
            item.sqlFieldType = 'boolean';
            break;
          case 'LocalDate':
            item.jsFieldType = 'Date';
            item.sqlFieldType = 'date';
            break;
          case 'ZonedDateTime':
            item.jsFieldType = 'Date';
            item.sqlFieldType = 'datetime';
            break;
          case 'Instant':
            item.jsFieldType = 'Date';
            item.sqlFieldType = 'datetime';
            break;
          default:
            // 如果是个枚举类型
            if (item.fieldValues) {
              item.jsFieldType = 'enum';
              item.sqlFieldType = 'varchar';
            } else {
              item.jsFieldType = '< ' + item.fieldType + ' >';
              item.sqlFieldType = '< ' + item.sqlFieldType + ' >';
            }
            break;
        }
        // 避免空引用
        item.fieldValidateRules = item.fieldValidateRules || [];
      });
      // 当前表中所有使用到的外关联关系类型类名，不重复
      const relationshipsTypeList = [];
      // 当前表中所有使用到的外关联关系实体对象，不重复
      const relationshipsEntityList = [];
      entityModel.relationships.forEach(item => {
        // 避免空引用
        item.relationshipValidateRules = item.relationshipValidateRules || [];
        item.fieldValidateRules = item.fieldValidateRules || [];
        // 命名规则转换
        item.relationshipNamePlural = plural(item.relationshipName);
        item.relationshipClassName = tools.hyphenTransformPascal(item.relationshipName);
        item.otherEntityClassName = tools.hyphenTransformPascal(item.otherEntityName);
        item.otherEntityCamelName = item.otherEntityName;
        item.otherEntityFolderName = item.otherEntityName.replace(/([A-Z])/g,"-$1").toLowerCase();
        item.relationshipTypeClassName = tools.hyphenTransformPascal(item.relationshipType);
        let  existsType = false;
        for (let i = 0; i < relationshipsTypeList.length; i++) {
          if (relationshipsTypeList[i] === item.relationshipTypeClassName) {
            existsType = true;
            break;
          }
        }
        if (!existsType) {
          relationshipsTypeList.push(item.relationshipTypeClassName);
        }
        let  existsEntity = false;
        for (let i = 0; i < relationshipsEntityList.length; i++) {
          if (relationshipsEntityList[i].otherEntityName === item.otherEntityName && item.otherEntityName) {
            existsEntity = true;
            break;
          }
        }
        if (!existsEntity) {
          relationshipsEntityList.push(item);
        }
      });
      entityModel.relationshipsTypeList = relationshipsTypeList;
      entityModel.relationshipsEntityList = relationshipsEntityList;
      const entityCamelName = entityJson.name.substr(0, 1).toLowerCase() + entityJson.name.substr(1);
      return {
        entityFolderName,
        entityFolderNamePlural: plural(entityFolderName),
        entityJson,
        entityModel,
        entityClassName: entityJson.name.substr(0, 1).toUpperCase() + entityJson.name.substr(1),
        entityCamelName,
        entityCamelNamePlural: plural(entityCamelName),
        jsonFile: entityJson,
        existsId,
        fieldTypeList
      }; 
  }
}
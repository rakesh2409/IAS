
export class ModuleConst
{
    static instance:ModuleConst;
    static isCreating:Boolean = false;

    ModuleConstructor() {
        if (!ModuleConst.isCreating) {
            throw new Error("You can't call new in ModuleConst instances! Call ModuleConst.getInstance() instead.");
        }
    }
    static getInstance() {
        if (ModuleConst.instance == null) {
            ModuleConst.isCreating = true;
            ModuleConst.instance = new ModuleConst();
            ModuleConst.isCreating = false;
        }
        return ModuleConst.instance;
    }
  
    READ: string = 'READ';
    READ_WRITE: string = 'READ_WRITE';
    HIDDEN: string = 'HIDDEN';
    ASSIGN_ALL: string = 'ASSIGN_ALL';
    REM_ALL_ASSIGNED: string = 'REM_ALL_ASSIGNED';
    ASSIGN: string = 'ASSIGN';
    REM_ASSIGNED: string = 'REM_ASSIGNED';

}
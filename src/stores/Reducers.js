export var InitialReducer = [];

export function TasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          serviceName: action.serviceName,
          package: action.package,
          estimation: action.estimation,
          totalPrice: action.totalPrice,
        },
      ];
    }
    case 'deleted': {
      return tasks.filter(t => {
        return t.id !== action.id;
      });
    }
    default: {
      throw Error('unknown action: ' + action.type);
    }
  }
}

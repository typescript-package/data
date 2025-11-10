import { Data } from "../lib";

describe('Hooks System', () => {
  describe('onChange hook', () => {
    it('should call onChange callback when value changes', () => {
      const instance = new Data<string>('initial');
      let changeCallbackCalled = false;
      let capturedNewValue: string | undefined;
      let capturedOldValue: string | undefined;

      instance.onChange((newValue, oldValue) => {
        changeCallbackCalled = true;
        capturedNewValue = newValue;
        capturedOldValue = oldValue;
      });

      instance.set('updated');

      expect(changeCallbackCalled).toBe(true);
      expect(capturedNewValue).toBe('updated');
      expect(capturedOldValue).toBe('initial');
    });

    it('should not call onChange callback when value is the same', () => {
      const instance = new Data<string>('same');
      let changeCallbackCalled = false;

      instance.onChange(() => {
        changeCallbackCalled = true;
      });

      instance.set('same');

      expect(changeCallbackCalled).toBe(false);
    });

    it('should call onChange when clearing value', () => {
      const instance = new Data<string>('value');
      let changeCallbackCalled = false;
      let capturedNewValue: string | null | undefined;
      let capturedOldValue: string | null | undefined;

      instance.onChange((newValue, oldValue) => {
        changeCallbackCalled = true;
        capturedNewValue = newValue;
        capturedOldValue = oldValue;
      });

      instance.clear();

      expect(changeCallbackCalled).toBe(true);
      expect(capturedNewValue).toBe(null);
      expect(capturedOldValue).toBe('value');
    });

    it('should allow unregistering onChange callback', () => {
      const instance = new Data<string>('initial');
      let changeCallbackCalled = false;

      instance.onChange(() => {
        changeCallbackCalled = true;
      });

      // Unregister by passing undefined
      instance.onChange(undefined);

      instance.set('updated');

      expect(changeCallbackCalled).toBe(false);
    });
  });

  describe('onSet hook', () => {
    it('should call onSet callback before value is set', () => {
      const instance = new Data<string>('initial');
      let setCallbackCalled = false;
      let capturedValue: string | undefined;

      instance.onSet((value) => {
        setCallbackCalled = true;
        capturedValue = value;
      });

      instance.set('new value');

      expect(setCallbackCalled).toBe(true);
      expect(capturedValue).toBe('new value');
      expect(instance.value).toBe('new value');
    });

    it('should allow unregistering onSet callback', () => {
      const instance = new Data<string>('initial');
      let setCallbackCalled = false;

      instance.onSet(() => {
        setCallbackCalled = true;
      });

      // Unregister by passing undefined
      instance.onSet(undefined);

      instance.set('updated');

      expect(setCallbackCalled).toBe(false);
    });
  });

  describe('onDestroy hook', () => {
    it('should call onDestroy callback when instance is destroyed', () => {
      const instance = new Data<string>('initial');
      let destroyCallbackCalled = false;

      instance.onDestroy(() => {
        destroyCallbackCalled = true;
      });

      instance.destroy();

      expect(destroyCallbackCalled).toBe(true);
    });

    it('should allow unregistering onDestroy callback', () => {
      const instance = new Data<string>('initial');
      let destroyCallbackCalled = false;

      instance.onDestroy(() => {
        destroyCallbackCalled = true;
      });

      // Unregister by passing undefined
      instance.onDestroy(undefined);

      instance.destroy();

      expect(destroyCallbackCalled).toBe(false);
    });
  });

  describe('Multiple hooks', () => {
    it('should call both onSet and onChange when setting a value', () => {
      const instance = new Data<string>('initial');
      let setCallbackCalled = false;
      let changeCallbackCalled = false;
      const callOrder: string[] = [];

      instance.onSet(() => {
        setCallbackCalled = true;
        callOrder.push('onSet');
      });

      instance.onChange(() => {
        changeCallbackCalled = true;
        callOrder.push('onChange');
      });

      instance.set('updated');

      expect(setCallbackCalled).toBe(true);
      expect(changeCallbackCalled).toBe(true);
      expect(callOrder).toEqual(['onSet', 'onChange']);
    });

    it('should handle multiple hook registrations correctly', () => {
      const instance = new Data<number>(0);
      let firstOnChangeCalled = false;
      let secondOnChangeCalled = false;

      instance.onChange(() => {
        firstOnChangeCalled = true;
      });

      // Second registration should replace first
      instance.onChange(() => {
        secondOnChangeCalled = true;
      });

      instance.set(1);

      expect(firstOnChangeCalled).toBe(false);
      expect(secondOnChangeCalled).toBe(true);
    });
  });

  describe('Callback return type', () => {
    it('onChange callback should return void', () => {
      const instance = new Data<string>('initial');
      
      const callback = (newValue: string, oldValue: string): void => {
        // Callback returns void
      };

      instance.onChange(callback);
      instance.set('updated');
      
      // No error should occur
      expect(instance.value).toBe('updated');
    });

    it('onSet callback should return void', () => {
      const instance = new Data<string>('initial');
      
      const callback = (value: string): void => {
        // Callback returns void
      };

      instance.onSet(callback);
      instance.set('updated');
      
      // Value should be set correctly
      expect(instance.value).toBe('updated');
    });

    it('onDestroy callback should return void', () => {
      const instance = new Data<string>('initial');
      
      const callback = (): void => {
        // Callback returns void
      };

      instance.onDestroy(callback);
      instance.destroy();
      
      // No error should occur
      expect(() => instance.value).toThrowError();
    });
  });
});
